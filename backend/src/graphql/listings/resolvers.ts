import { Types } from "mongoose";
import ListingService from "../../services/listings";
import { LIMIT } from "../../utils/constants";

export interface ListingSeachType{
    city : string,
    state : string,
    country : string,
    page?: number, 
    limit?: number 
}

export interface FilterListingInput {
    location?: string;
    bedCount?: string;
    bathCount?: string;
    priceRange?: { min: number; max: number };
    dateRange?: { from: Date; to: Date };
    preferences?: string[];
    amenities?: string[];
    utilitiesIncluded?: boolean;
    sortBy?: { time?: string; price?: string };
}

interface PriceRange {
    min: number;
    max: number;
    period: string;
}

interface SortBy {
    time?: string;
    price?: string;
}

interface SubleaseDurationInput {
    from: Date;
    to: Date;
}



const queries = {
    getListings : async(_ : any, { city, state, country, page, limit } : ListingSeachType) => {
        const listings = await ListingService.getListings({city, state, country, page, limit});
        return listings
    },

    getIndividualListing: async(_:any, { listingID }: { listingID: string | Types.ObjectId }) => {
        const listing = await ListingService.getIndividualListing(listingID);
        return listing
    },

    getMyListings : async(_ : any,params : any, {currentUser}: {currentUser : any}) => {
        const myListings = await ListingService.getMyListings(currentUser.id);
        return myListings
    },

    getSearchBasedListings  : async(_ : any,{filteringConditions,page=1,limit=LIMIT} : {
        filteringConditions : FilterListingInput, 
        page: number,
        limit:number
    }) => {
        // console.log(filteringConditions);
        const searchedListings = await ListingService.getSearchBasedListings({filteringConditions, page, limit});
        // console.log(searchedListings);
        return searchedListings
    },

    getFavouriteListings : async(_:any, params: any, {currentUser}: any) => {
        const favouriteListings = await ListingService.getFavouriteListings(currentUser.id);
        return favouriteListings;
    }
}

const mutations = {
    createListing : async (parent : any, {listingDetails, listingImages} : any, {currentUser} : any) => {
        try {
            const createdListing = await ListingService.createListing(listingDetails, listingImages, currentUser?._id);
            return createdListing;
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'An unknown error occurred'
            );
        }
    },

    editListing : async(parent: any, {listingID, createdBy, listingDetails, imagesURL, newImages} : any, {currentUser} : any) => {
        console.log(listingID, createdBy, listingDetails, imagesURL, newImages);
        try {
            const editedListingResponse = await ListingService.editListings({listingID, createdBy, listingDetails, imagesURL, newImages});
            return editedListingResponse;
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'An unknown error occurred while updating the listings'
            );
        }
    }
}


export const resolvers = { queries, mutations };