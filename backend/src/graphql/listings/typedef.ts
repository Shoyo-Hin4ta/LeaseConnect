export const typeDefs = `#graphql

    
    input ListingFormInput {
        currency: String!
        amount: String!
        timePeriod: String!
        subleaseDuration: String!
        title: String!
        propertyType: String!
        bedroom: String!
        bathroom: String!
        streetAddress: String!
        city: String!
        state: String!
        zipcode: String!
        country: String!
        utilities: [String]
        utilitiesIncludedInRent: String!
        amenities: [String]
        preferences: [String]
        description: String
  }

  type Location {
        streetAddress: String!
        city: String!
        state: String!
        zipcode: String!
        country: String!
    }

    type SubleaseDuration {
        from: String!
        to: String!
    }

    type NewListingResponse {
        id: ID!
        title: String!
        propertyType: String!
        bedroom: String!
        bathroom: String!
        location: Location!
        utilitiesIncludedInRent: Boolean!
        utilities: [String]
        amenities: [String]
        preferences: [String]
        description: String
        currency: String!
        amount: Float!
        timePeriod: String!
        dailyRate: Float!
        subleaseDuration: SubleaseDuration!
        numberOfDays: Int!
        images: [String]!
        createdAt: String!
        updatedAt: String!
    }

`