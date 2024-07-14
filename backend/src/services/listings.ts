import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import uploadOnCDN from '../utils/cloudinary';
import { Listing } from '../models/listing.model';
import moment from 'moment';
import { Types } from 'mongoose';
import { User } from '../models/user.model';
import { FilterListingInput, ListingSeachType } from '../graphql/listings/resolvers';
import { LIMIT } from '../utils/constants';

import { FilterQuery } from 'mongoose';

class ListingService {
    public static async createListing(payload: any, listingImages: any[], currentUserID : Types.ObjectId) {
        try {
            // Check if a listing with the same address already exists
            const existingListing = await Listing.findOne({
                'location.streetAddress': payload.streetAddress,
                'location.city': payload.city,
                'location.state': payload.state,
                'location.zipcode': payload.zipcode,
                'location.country': payload.country
            });

            if (existingListing) {
                throw new Error('A listing with this address already exists');
            }

            // Handle image uploads
            const imageUrls = await this.handleListingImagesUpload(listingImages);

            // Parse the subleaseDuration string
            const [fromDate, toDate] = payload.subleaseDuration.split(' - ');
 
            // Calculate the number of days
            const start = moment(fromDate);
            const end = moment(toDate);
            const numberOfDays = end.diff(start, 'days');

            // Calculate daily rate
            const dailyRate = parseFloat(payload.amount) / (payload.timePeriod === 'month' ? 30 : payload.timePeriod === 'week' ? 7 : 1);

            // Create new listing object
            const newListing = new Listing({
                title: payload.title,
                propertyType: payload.propertyType,
                bedroom: payload.bedroom,
                bathroom: payload.bathroom,
                location: {
                    streetAddress: payload.streetAddress,
                    city: payload.city,
                    state: payload.state,
                    zipcode: payload.zipcode,
                    country: payload.country
                },
                utilitiesIncludedInRent: payload.utilitiesIncludedInRent === 'true',
                utilities: payload.utilities,
                amenities: payload.amenities,
                preferences: payload.preferences,
                description: payload.description,
                currency: payload.currency,
                amount: parseFloat(payload.amount),
                timePeriod: payload.timePeriod,
                dailyRate: dailyRate,
                subleaseDuration: {
                    from: new Date(fromDate),
                    to: new Date(toDate)
                },
                numberOfDays: numberOfDays,
                images: imageUrls,
                createdBy: currentUserID
            });

            // Save the listing
            const savedListing = await newListing.save();

            await User.findByIdAndUpdate(
                currentUserID,
                { $push: { ownListings: savedListing._id } },
                { new: true }
            );

            const createdListing = await Listing.findById(savedListing._id);

            if (!createdListing) {
                throw new Error('Failed to retrieve created listing');
            }

            return createdListing;

        } catch (error) {
            console.error('Error creating listing:', error);
            throw new Error('Listing creation failed: ' + error);
        }
    }

    private static async handleListingImagesUpload(listingImages: any[]): Promise<string[]> {
        const imageUrls: string[] = [];

        for (const image of listingImages) {
            const { name, type, data } = image;
            
            if (!type.startsWith('image/')) {
                throw new Error('Only image files are allowed');
            }

            const uniqueFilename = `${uuidv4()}${path.extname(name)}`;
            
            const publicDir = path.join(process.cwd(), 'public', 'images');
            
            if (!fs.existsSync(publicDir)){
                fs.mkdirSync(publicDir, { recursive: true });
            }
            
            const pathName = path.join(publicDir, uniqueFilename);
            
            const base64Data = data.split(',')[1];
            
            fs.writeFileSync(pathName, base64Data, 'base64');

            console.log(`File saved as ${pathName}`);

            const cdnResponse = await this.uploadOnCDN(pathName);
            
            fs.unlinkSync(pathName);

            if (!cdnResponse || !cdnResponse.url) {
                throw new Error('Failed to upload image to CDN');
            }

            imageUrls.push(cdnResponse.url);
        }

        return imageUrls;
    }

    private static async uploadOnCDN(localFile: string) {
        return await uploadOnCDN(localFile);
    }

    public static async getListings({city, state, country, page=1, limit=LIMIT } :ListingSeachType) {
        console.log(page, limit)
        try {
            let query: any = {};

            if (!city && !state && !country) {
                country = "USA";
            }

            if (city || state || country) {
                if (city) query['location.city'] = new RegExp(city, 'i');
                if (state) query['location.state'] = new RegExp(state, 'i');
                if (country) query['location.country'] = new RegExp(country, 'i');
            }

            const skip = ( page-1 ) * limit;
            
            const listings = await Listing.find(query)
            .populate('createdBy')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit + 1)
            .exec();

            const totalCount = await Listing.countDocuments(query);
            const hasNextPage = listings.length > limit;

            return {
                listings: listings.slice(0, limit),
                totalCount,
                hasNextPage
            };

        } catch (error) {
            console.log(`Error in get getListings function in Listing Services : ${error}`) ;
            
        }

    }

    public static async getIndividualListing(listingID : string | Types.ObjectId  ){
        try {
            const listing = await Listing
                                .findById(listingID)
                                .sort({ createdAt: -1 })
                                .populate('createdBy')
                                .exec();
            
            if(!listing){
                throw new Error("No listing present with this ID or has been deleted.")
            }

            return listing

        } catch (error) {
            console.log(`Error in  getIndividualListing function in Listing Services : ${error}`) ;
        }
                                        
    }

    public static async getMyListings(currentUserID: Types.ObjectId) {
        try {
            const ownListings = await User.findById(currentUserID)
                .populate('ownListings')
                .select('ownListings')

            
    
            if (!ownListings) {
                return []; 
            }
    
            // console.log(ownListings.ownListings);
            return ownListings.ownListings;
    
        } catch (error) {
            console.log(`Error in getMyListings function in Listing Services: ${error}`);
            throw error;
        }
    }

    public static async editListings(
        {listingID,
        createdBy,
        listingDetails,
        imagesURL,
        newImages} : any
    ) {
        try {
            const existingListing = await Listing.findById(listingID);
            if (!existingListing) {
                throw new Error('Listing not found');
            }
    
            if (existingListing.createdBy.toString() !== createdBy) {
                throw new Error('Unauthorized to edit this listing');
            }
            let newImageUrls: string[] = [];
            if (newImages && newImages.length > 0) {
                newImageUrls = await this.handleListingImagesUpload(newImages);
            }
    
            const allImageUrls = [...imagesURL, ...newImageUrls];
    
            const fromDate = new Date(listingDetails.subleaseDuration.from);
            const toDate = new Date(listingDetails.subleaseDuration.to);
    
            const numberOfDays = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
    
            const dailyRate = parseFloat(listingDetails.amount) / (listingDetails.timePeriod === 'month' ? 30 : listingDetails.timePeriod === 'week' ? 7 : 1);
    
            const updatedListing = {
                title: listingDetails.title,
                propertyType: listingDetails.propertyType,
                bedroom: listingDetails.bedroom,
                bathroom: listingDetails.bathroom,
                location: {
                    streetAddress: listingDetails.streetAddress,
                    city: listingDetails.city,
                    state: listingDetails.state,
                    zipcode: listingDetails.zipcode,
                    country: listingDetails.country
                },
                utilitiesIncludedInRent: listingDetails.utilitiesIncludedInRent === 'true',
                utilities: listingDetails.utilities,
                amenities: listingDetails.amenities,
                preferences: listingDetails.preferences,
                description: listingDetails.description,
                currency: listingDetails.currency,
                amount: parseFloat(listingDetails.amount),
                timePeriod: listingDetails.timePeriod,
                dailyRate: dailyRate,
                subleaseDuration: {
                    from: fromDate,
                    to: toDate
                },
                numberOfDays: numberOfDays,
                images: allImageUrls
            };
    
            const savedListing = await Listing.findByIdAndUpdate(listingID, updatedListing, { new: true });
    
            if (!savedListing) {
                throw new Error('Failed to update listing');
            }
    
            return savedListing;
    
        } catch (error) {
            console.error('Error updating listing:', error);
            throw new Error('Listing update failed: ' + error);
        }
    }


    public static async getSearchBasedListings({
        filteringConditions,
        page = 1,
        limit = LIMIT
    }: {
        filteringConditions: FilterListingInput;
        page: number;
        limit: number;
    }) {
        try {
            const query: FilterQuery<typeof Listing> = {};
    
            // Location handling
            if (filteringConditions.location) {
                const locationRegex = new RegExp(filteringConditions.location, 'i');
                query['$or'] = [
                    { 'location.streetAddress': locationRegex },
                    { 'location.city': locationRegex },
                    { 'location.state': locationRegex },
                    { 'location.zipcode': locationRegex },
                    { 'location.country': locationRegex }
                ];
            }
    
            // Bed and Bath count
            if (filteringConditions.bedCount) query.bedroom = filteringConditions.bedCount;
            if (filteringConditions.bathCount) query.bathroom = filteringConditions.bathCount;
    
            // Price range
            if (filteringConditions.priceRange) {
                query.dailyRate = {
                    $gte: filteringConditions.priceRange.min,
                    $lte: filteringConditions.priceRange.max
                };
            }
    
            // Date range
            if (filteringConditions.dateRange) {
                query.$and = [
                    { 'subleaseDuration.from': { $lte: filteringConditions.dateRange.to } },
                    { 'subleaseDuration.to': { $gte: filteringConditions.dateRange.from } }
                ];
            }
    
            // Preferences and Amenities
            if (filteringConditions.preferences && filteringConditions.preferences.length > 0) {
                query.preferences = { $all: filteringConditions.preferences };
            }
            if (filteringConditions.amenities && filteringConditions.amenities.length > 0) {
                query.amenities = { $all: filteringConditions.amenities };
            }
    
            // Utilities included
            if (filteringConditions.utilitiesIncluded !== undefined && filteringConditions.utilitiesIncluded !== null) {
                query.utilitiesIncludedInRent = filteringConditions.utilitiesIncluded;
            }
    
            const skip = (page - 1) * limit;
    
            // Sorting
            let sort: any = { createdAt: -1 };  // Default sort: newest first
            if (filteringConditions.sortBy) {
                if (filteringConditions.sortBy.time) {
                    switch (filteringConditions.sortBy.time) {
                        case 'date_newest':
                            sort = { createdAt: -1 };
                            break;
                        case 'date_oldest':
                            sort = { createdAt: 1 };
                            break;
                    }
                }
                if (filteringConditions.sortBy.price) {
                    switch (filteringConditions.sortBy.price) {
                        case 'price_high_to_low':
                            sort = { dailyRate: -1 };
                            break;
                        case 'price_low_to_high':
                            sort = { dailyRate: 1 };
                            break;
                    }
                }
            }
    
            const listings = await Listing.find(query)
                .populate('createdBy')
                .sort(sort)
                .skip(skip)
                .limit(limit + 1)
                .exec();
    
            const totalCount = await Listing.countDocuments(query);
            const hasNextPage = listings.length > limit;
            console.log('Final query:', JSON.stringify(query, null, 2));
    
            return {
                listings: listings.slice(0, limit),
                totalCount,
                hasNextPage
            };
    
        } catch (error) {
            console.log(`Error in getSearchBasedListings function in Listing Services: ${error}`);
            throw error;
        }
    }
}

export default ListingService;
