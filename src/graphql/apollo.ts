import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

const httpLink = new HttpLink({
  uri: "http://ec2-3-89-108-168.compute-1.amazonaws.com:5000/graphql", // ✅ Your GraphQL backend
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
