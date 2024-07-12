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
        createdBy: ID!
    }

    type Location {
        streetAddress: String!
        city: String!
        state: String!
        zipcode: String!
        country: String!
    }

    type SubleaseDuration {
        from: DateTime!
        to: DateTime!
    }

    enum PropertyType {
        house,
        apartment,
        studio
    }

    enum Utility {
        water,
        electricity,
        gas,
        internet,
        trash
    }

    enum Amenity {
        parking,
        gym,
        pool,
        laundry
    }

    enum Preference {
        no_smoking,
        no_drinking,
        no_pets,
        students_only,
        working_only,
        vegetarian,
        eggeterian,
        girls_only,
        cleanliness,
        couples_only
    }

    enum Currency {
        usd,
        inr
    }
    enum TimePeriod {
        day
        week
        month
    }

    type Listing {
        id: ID!
        title: String!
        propertyType: PropertyType!
        bedroom: String!
        bathroom: String!
        location: Location!
        utilitiesIncludedInRent: Boolean!
        utilities: [Utility!]
        amenities: [Amenity!]
        preferences: [Preference!]
        description: String
        currency: Currency!
        amount: Float!
        timePeriod: TimePeriod!
        dailyRate: Float!
        subleaseDuration: SubleaseDuration!
        numberOfDays: Int!
        images: [String!]!
        createdBy: User!
    }

    type MyListing {
        id: ID!
        title: String!
        propertyType: PropertyType!
        bedroom: String!
        bathroom: String!
        location: Location!
        utilitiesIncludedInRent: Boolean!
        utilities: [Utility!]
        amenities: [Amenity!]
        preferences: [Preference!]
        description: String
        currency: Currency!
        amount: Float!
        timePeriod: TimePeriod!
        dailyRate: Float!
        subleaseDuration: SubleaseDuration!
        numberOfDays: Int!
        images: [String!]!
    }

    input SubleaseDurationInput {
        from: DateTime!
        to: DateTime!
    }


    input EditListingFormInput {
        currency: String!
        amount: String!
        timePeriod: String!
        subleaseDuration: SubleaseDurationInput
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


  type EditListingFormResponse {
        id: ID!
        title: String!
        propertyType: PropertyType!
        bedroom: String!
        bathroom: String!
        location: Location!
        utilitiesIncludedInRent: Boolean!
        utilities: [Utility!]
        amenities: [Amenity!]
        preferences: [Preference!]
        description: String
        currency: Currency!
        amount: Float!
        timePeriod: TimePeriod!
        dailyRate: Float!
        subleaseDuration: SubleaseDuration!
        numberOfDays: Int!
        images: [String!]!
        createdBy: ID!
    }

`