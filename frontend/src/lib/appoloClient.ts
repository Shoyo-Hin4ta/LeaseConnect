import { ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { BACKEND_URI } from './utils';

const uploadLink = createUploadLink({
  uri: `${BACKEND_URI}/graphql`,
  credentials: 'include'
});

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
}); 

export default client;