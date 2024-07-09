export const typeDefs = `#graphql

    input AddressInput {
        city: String!
        state: String!
        country: String!
        postcode: String!
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
        postcode: String!
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
        createdAt: String!
        updatedAt: String!
    }
`;