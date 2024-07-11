import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import uploadOnCDN from '../utils/cloudinary';
import { Listing } from '../models/listing.model';
import moment from 'moment';
import { Types } from 'mongoose';
import { User } from '../models/user.model';
import { ListingSeachType } from '../graphql/listings/resolvers';


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

    public static async getListings({city, state, country } :ListingSeachType) {
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

            
            const listings = await Listing.find(query)
            .populate('createdBy')
            .exec();


            return listings;

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
}

export default ListingService;
