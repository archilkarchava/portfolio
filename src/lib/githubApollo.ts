import { githubGraphqlApiEndpoint, githubToken } from '@/lib/constants'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const githubApolloClient = new ApolloClient({
  uri: githubGraphqlApiEndpoint,
  headers: {
    Authorization: githubToken ? `bearer ${githubToken}` : '',
  },
  cache: new InMemoryCache(),
})
