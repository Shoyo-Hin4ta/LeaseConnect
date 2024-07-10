export const mutations = `#graphql
    signUp(input: UserSignUpInput!, profileImage: Upload!): SignUpResponse!

    login(loginDetails: LoginInput!) : LoginResponse!

    logout : LogoutResponse

`