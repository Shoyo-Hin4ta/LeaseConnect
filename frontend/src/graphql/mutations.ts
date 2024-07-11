import { gql } from "@apollo/client";

export const ADD_TO_FAVOURITE_QUERY = gql`

    mutation AddToFavourite($listingId: ID!) {
        addToFavourite(listingID: $listingId)
    }
`


export const REMOVE_FAVOURITE_QUERY = gql`

    mutation RemoveFavourite($listingId: ID!) {
        removeFavourite(listingID: $listingId)
    }
`