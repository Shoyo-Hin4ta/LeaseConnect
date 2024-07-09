 // You'll need to install this package

import UserService from "../../services/users";

const queries = {
    Hello: () => "This is a placeholder query"
} 

const mutations = {
    signUp: async (_: any, { input, profileImage }: any) => {
        try {
            const newUser = await UserService.createUser(input, profileImage);
            return newUser;
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : 'An unknown error occurred'
            );
        }
        
    }
}


export const resolvers = { queries, mutations };