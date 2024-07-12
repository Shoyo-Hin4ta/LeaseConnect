import { gql } from "@apollo/client";
import { CORE_LISTING_FIELDS, CORE_INDIVIDUAL_LISTING_FIELDS, CORE_MY_LISTING_FIELDS } from './fragments';

export const GET_LISTINGS = gql`

    query GetListings($city: String, $state: String, $country: String) {
        getListings(city: $city, 
                    state: $state, 
                    country: $country) {
                ...CoreListingFields
        }
    }

    ${CORE_LISTING_FIELDS}
`


export const GET_INDIVIDUAL_LISTING = gql`
    query GetListings($listingID: ID!) {
        getIndividualListing(listingID: $listingID) {
            ...CoreIndividualListingFields
        }

    }
    ${CORE_INDIVIDUAL_LISTING_FIELDS}
`

export const GET_MY_LISTINGS = gql`

    query GetMyListings {
        getMyListings {
            ...CoreMyListingFields
        }
    }

    ${CORE_MY_LISTING_FIELDS}
`