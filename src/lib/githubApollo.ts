import { githubGraphqlApiEndpoint, GITHUB_TOKEN } from '@/lib/constants'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const githubApolloClient = new ApolloClient({
  uri: githubGraphqlApiEndpoint,
  headers: {
    Authorization: GITHUB_TOKEN ? `bearer ${GITHUB_TOKEN}` : '',
  },
  cache: new InMemoryCache(),
})
