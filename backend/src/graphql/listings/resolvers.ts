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
    },

    getMyListings : async(_ : any,params : any, {currentUser}: {currentUser : any}) => {
        const myListings = await ListingService.getMyListings(currentUser.id);
        return myListings
    },
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