import { gql } from "@apollo/client";
import { EDIT_PROFILE_FIELDS } from "./fragments";

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