import { ApolloServer } from "@apollo/server";



async function createGraphQLServer(){

    // Same ApolloServer initialization as before, plus the drain plugin
    const gqlServer = new ApolloServer({
        typeDefs : `type Query{
            hello : String
        }`,
        resolvers : {
            Query : {
                hello : () => `Hello world`
            },
        },
    });
    
    await gqlServer.start();

    return gqlServer;
}

export default createGraphQLServer;
