export const mutations = `#graphql
    signUp(input: UserSignUpInput!, profileImage: Upload!): SignUpResponse!

    login(loginDetails: LoginInput!) : User!

    logout : LogoutResponse

    addToFavourite(listingID: ID!): String

    removeFavourite(listingID: ID!) : String

    editProfile(editUserProfileData: EditUserProfileInput) : User

`