import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Auth from '../utils/auth';

const httpLink = createHttpLink({
  uri:  'http://localhost:3001/graphql',// process.env.GRAPHQL_ENDPOINT, 
  headers: {
    Authorization: `Bearer ${Auth.getToken()}` 
  }
});



const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
