import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { BACKEND_LOCAL_URI, BACKEND_URI } from './utils';


const localUploadLink = createUploadLink({
  uri: `${BACKEND_LOCAL_URI}/graphql`,
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
});

const productionUploadLink = createUploadLink({
  uri: `${BACKEND_URI}/graphql`,
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
});

const chooseLink = () => {
  if (import.meta.env.VITE_NODE_ENV === 'development') {
    return localUploadLink;
  } else {
    return productionUploadLink;
  }
};

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, chooseLink()]),
  cache: new InMemoryCache(),
}); 

export default client;