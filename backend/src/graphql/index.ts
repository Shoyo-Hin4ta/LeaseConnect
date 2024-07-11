import { ApolloServer } from "@apollo/server";
import { User } from "./users";
import { Listing } from "./listings";

async function createGraphQLServer(){

    // Same ApolloServer initialization as before, plus the drain plugin
    const gqlServer = new ApolloServer({
        typeDefs : `
                    scalar Upload
                    scalar DateTime             
                    ${User.typeDefs}
                    ${Listing.typeDefs}
                    
                    type Query{
                        ${User.queries}
                        ${Listing.queries}
                    }
                        
                    type Mutation{
                        ${User.mutations}
                        ${Listing.mutations}
                    }`
        ,
        resolvers : {
            Query : {
                ...User.resolvers.queries,
                ...Listing.resolvers.queries
            },
            Mutation : {
                ...User.resolvers.mutations,
                ...Listing.resolvers.mutations
            }
        },
    });
    
    await gqlServer.start();

    return gqlServer;
}

export default createGraphQLServer;
