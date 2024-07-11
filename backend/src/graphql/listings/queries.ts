export const queries = `#graphql

    getIndividualListing(listingID: ID!): Listing

    getListings(city: String ,state: String, country:String) : [Listing!]!

`