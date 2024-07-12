import { gql } from "@apollo/client";
import { CORE_EDIT_LISTING_FIELDS, EDIT_PROFILE_FIELDS } from "./fragments";

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

export const EDIT_PROFILE_QUERY = gql`
    mutation EditProfile($editUserProfileData: EditUserProfileInput) {
        editProfile(editUserProfileData: $editUserProfileData) {
            ...CoreEditProfileListingFields

  }
}
    ${EDIT_PROFILE_FIELDS}
`

export const EDIT_LISTING_QUERY = gql`
    mutation EditListing($listingId: ID!, $createdBy: ID!, $listingDetails: EditListingFormInput, $imagesUrl: [String!], $newImages: [Upload!]) {
        editListing(listingID: $listingId, createdBy: $createdBy, listingDetails: $listingDetails, imagesURL: $imagesUrl, newImages: $newImages) {
         ...CoreEditListingFields
    }
}
    ${CORE_EDIT_LISTING_FIELDS}
`