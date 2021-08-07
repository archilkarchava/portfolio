import { githubGraphqlApiEndpoint, GITHUB_TOKEN } from '@/lib/constants'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const githubApolloClient = new ApolloClient({
  uri: githubGraphqlApiEndpoint,
  headers: {
    Authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : '',
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
