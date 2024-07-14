import { gql } from "@apollo/client";
import { CORE_LISTING_FIELDS, CORE_INDIVIDUAL_LISTING_FIELDS, CORE_MY_LISTING_FIELDS } from './fragments';

export const GET_LISTINGS = gql`
    query GetListings($city: String, $state: String, $country: String, $page: Int, $limit: Int) {
        getListings(city: $city, state: $state, country: $country, page: $page, limit: $limit) {
            listings {
                ...CoreListingFields
            }
            totalCount
            hasNextPage
        }
    }
    ${CORE_LISTING_FIELDS}
`;

export const GET_SEARCH_LISTINGS = gql`
    query GetSearchBasedListings($filteringConditions: FilterListingInput, $page: Int, $limit: Int) {
        getSearchBasedListings(filteringConditions: $filteringConditions, page: $page, limit: $limit) {
            listings {
                    ...CoreListingFields
                }
                totalCount
                hasNextPage
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


export const GET_MY_FAVOURITE_LISTINGS = gql`

    query GetFavouriteListings {
        getFavouriteListings {
            ...CoreMyListingFields
        }
    }
    ${CORE_MY_LISTING_FIELDS}
`