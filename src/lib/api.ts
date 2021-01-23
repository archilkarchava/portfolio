import { githubApolloClient } from '@/lib/githubApollo'
import type { PinnedRepositoriesQuery } from '@/types/generated'
import { gql } from '@apollo/client'

export async function getPinnedRepositories(githubLogin: string) {
  return githubApolloClient.query<PinnedRepositoriesQuery>({
    query: gql`
      query PinnedRepositories($login: String!) {
        repositoryOwner(login: $login) {
          ... on User {
            pinnedItems(first: 6) {
              edges {
                node {
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
        }
      }
    `,
    variables: { login: githubLogin },
  })
}
