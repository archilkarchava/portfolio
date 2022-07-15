import { ApolloClient, InMemoryCache } from '@apollo/client'

export const githubApolloClient = new ApolloClient({
  uri: process.env.GITHUB_GRAPHQL_API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
})
