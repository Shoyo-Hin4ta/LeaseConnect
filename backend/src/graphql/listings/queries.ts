export const queries = `#graphql

    getIndividualListing(listingID: ID!): Listing

    getListings(city: String, state: String, country: String, page: Int, limit: Int): ListingConnection!

    getMyListings : [MyListing!]

    getSearchBasedListings(filteringConditions: FilterListingInput, page:Int, limit: Int ) : ListingConnection

    getFavouriteListings : [MyListing!]

    removeMyListings(listingID: ID!) : String
`