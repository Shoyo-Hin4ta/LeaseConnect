import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { BACKEND_LOCAL_URI, BACKEND_URI } from './utils';

const localUploadLink = createUploadLink({
  uri: `${BACKEND_LOCAL_URI}/graphql`,
  credentials: 'include',
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
});

const productionUploadLink = createUploadLink({
  uri: `${BACKEND_URI}/graphql`,
  credentials: 'include'
});

const chooseLink = () => {
  if (import.meta.env.VITE_NODE_ENV === 'development') {
    return localUploadLink;
  } else {
    return productionUploadLink;
  }
};

const client = new ApolloClient({
  link: ApolloLink.from([chooseLink()]),
  cache: new InMemoryCache(),
}); 

export default client;