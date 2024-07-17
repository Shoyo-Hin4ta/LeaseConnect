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
        if(currentUser){
            const myListings = await ListingService.getMyListings(currentUser.id);
            return myListings
        }else{
            throw new Error('Login first');

        }
    },

    getSearchBasedListings  : async(_ : any,{filteringConditions,page=1,limit=LIMIT} : {
        filteringConditions : FilterListingInput, 
        page: number,
        limit:number
    }) => {
        const searchedListings = await ListingService.getSearchBasedListings({filteringConditions, page, limit});
        return searchedListings
    },

    getFavouriteListings : async(_:any, params: any, {currentUser}: any) => {
        if(currentUser){
            const favouriteListings = await ListingService.getFavouriteListings(currentUser.id);
            return favouriteListings;
        }else{
            throw new Error('What you doing bradda');
        }
    },

    removeMyListings : async(_:any, {listingID}: any, {currentUser}: any) => {
        if(currentUser){
            const response = await ListingService.removeMyListings(listingID, currentUser.id);
            return response;
        }else{
            throw new Error('Not authorized');
        }
    }

}

const mutations = {
    createListing : async (parent : any, {listingDetails, listingImages} : any, {currentUser} : any) => {
        if(currentUser){
            try {
                const createdListing = await ListingService.createListing(listingDetails, listingImages, currentUser?._id);
                return createdListing;
            } catch (error) {
                throw new Error(
                    error instanceof Error ? error.message : 'An unknown error occurred'
                );
            }
        }else{
            throw new Error('What you doing bradda');
        }
    },

    editListing : async(parent: any, {listingID, createdBy, listingDetails, imagesURL, newImages} : any, {currentUser} : any) => {
        if(currentUser){
            try {
                const editedListingResponse = await ListingService.editListings({listingID, createdBy, listingDetails, imagesURL, newImages});
                return editedListingResponse;
            } catch (error) {
                throw new Error(
                    error instanceof Error ? error.message : 'An unknown error occurred while updating the listings'
                );
            }
        }else{
            throw new Error('What you doing bradda');
        }
    }
}


export const resolvers = { queries, mutations };