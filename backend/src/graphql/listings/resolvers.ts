import ListingService from "../../services/listings";

const queries = {}

const mutations = {
    createListing : async (parent : any, {listingDetails, listingImages} : any) => {
        try {
            // You might want to check authentication here if required
            // if (!context.user) throw new Error('You must be logged in to create a listing');

            const createdListing = await ListingService.createListing(listingDetails, listingImages);
            return createdListing;
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'An unknown error occurred'
            );
    }
    }
}

export const resolvers = { queries, mutations };