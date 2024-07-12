import { gql } from '@apollo/client';


export const CORE_LISTING_FIELDS = gql`

    fragment CoreListingFields on Listing{
        id,
        title,
        amount,
        currency,
        timePeriod,
        subleaseDuration {
            from
            to
        },
        images,
        dailyRate,
        location {
            streetAddress
            state
            country
            city
        },
        preferences,
        numberOfDays,
        createdBy{
            id
        }
    }


`


export const CORE_MY_LISTING_FIELDS = gql`

    fragment CoreMyListingFields on MyListing{
        id,
        title,
        amount,
        currency,
        timePeriod,
        subleaseDuration {
            from
            to
        },
        images,
        dailyRate,
        location {
            streetAddress
            state
            country
            city
        },
        preferences,
        numberOfDays,
    }

`

export const CORE_INDIVIDUAL_LISTING_FIELDS = gql`
    fragment CoreIndividualListingFields on Listing{
        amenities
        amount
        bathroom
        bedroom
        createdBy {
        name
        phone
        email
        }
        currency
        dailyRate
        description
        id
        images
        location {
        city
        country
        state
        streetAddress
        zipcode
        }
        numberOfDays
        preferences
        propertyType
        subleaseDuration {
        from
        to
        }
        timePeriod
        title
        utilitiesIncludedInRent
        utilities
        numberOfDays
    }

`

export const EDIT_PROFILE_FIELDS = gql`

    fragment CoreEditProfileListingFields on User{
        id
        name
        email
        age
        gender
        phone
        profileImage
        address{
          city
          state
          country
          zipcode
        },
        favoriteListings
    }
`