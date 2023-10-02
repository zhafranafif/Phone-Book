import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
        uri: process.env.REACT_APP_API_ENDPOINT,
    }),
  cache: new InMemoryCache(),
});

export default client