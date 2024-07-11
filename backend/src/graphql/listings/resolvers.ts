import { Types } from "mongoose";
import ListingService from "../../services/listings";

export interface ListingSeachType{
    city : string,
    state : string,
    country : string
}

const queries = {
    getListings : async(_ : any, { city, state, country } : ListingSeachType) => {
        const listings = await ListingService.getListings({city, state, country});
        return listings
    },

    getIndividualListing: async(_:any, { listingID }: { listingID: string | Types.ObjectId }) => {
        const listing = await ListingService.getIndividualListing(listingID);
        return listing
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
    }
}


export const resolvers = { queries, mutations };