import { gql } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    getCurrentUser {
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
        favoriteListings,
        accessToken
    }
  }
`;


export const LOGOUT_MUTATION = gql`
  mutation LogoutUser{
    logout{
      message
      success
    }
  }

`

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(loginDetails: $input) {
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
        favoriteListings,
        accessToken
    }
  }
`;