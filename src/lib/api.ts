import { githubApolloClient } from '@/lib/githubApollo'
import { gql } from '@apollo/client'

export async function getPinnedRepositories(githubLogin: string, amount = 100) {
  return githubApolloClient.query<PinnedRepositoriesQuery>({
    query: gql`
      query PinnedRepositories($login: String!, $amount: Int!) {
        user(login: $login) {
          pinnedItems(first: $amount, types: REPOSITORY) {
            nodes {
              ... on Repository {
                id
                name
                descriptionHTML
                url
                homepageUrl
              }
            }
          }
        }
      }
    `,
    variables: { login: githubLogin, amount },
  })
}
