import ListingService from "../../services/listings";

const queries = {}

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