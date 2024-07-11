export const typeDefs = `#graphql

    input AddressInput {
        city: String!
        state: String!
        country: String!
        zipcode: String!
    }

    input UserSignUpInput {
        name: String!
        email: String!
        password: String!
        age: String!
        gender: String
        phone: String!
        address: AddressInput
    }

    input ProfileImageInput{
        profileImage: Upload!
    }

    type Address {
        city: String!
        state: String!
        country: String!
        zipcode: String!
    }

    type SignUpResponse {
        id: ID!
        name: String!
        email: String!
        age: String!
        gender: String
        phone: String!
        profileImage: String!
        address: Address
    }

    type LoginResponse {
        id: ID!
        name: String!
        email: String!
        age: String!
        gender: String
        phone: String!
        profileImage: String!
        address: Address
    }

    input LoginInput{
        email:String!
        password: String!
    }


    type CurrentUser{
        id: ID!
        name: String!
        email: String!
        age: String!
        gender: String
        phone: String!
        profileImage: String!
        address: Address
    }

    type LogoutResponse{
        message: String!
        success : Boolean!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        gender: String
        phone: String!
        profileImage: String!
        address: Address
        favoriteListings: [ID!]
        ownListings: [ID!]
        chats: [ID!]
    }

    
`;

// later add favourites list in the current User