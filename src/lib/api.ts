import { githubApolloClient } from '@/lib/githubApollo'
import { gql } from '@apollo/client'

export async function getPinnedRepositories(
  githubLogin: PinnedRepositoriesQueryVariables['login'] = process.env
    .NEXT_PUBLIC_GITHUB_LOGIN,
  amount: PinnedRepositoriesQueryVariables['amount'] = 100
) {
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

export async function getProfileInfo(
  githubLogin: ProfileInfoQueryVariables['login'] = process.env
    .NEXT_PUBLIC_GITHUB_LOGIN
) {
  return githubApolloClient.query<ProfileInfoQuery>({
    query: gql`
      query ProfileInfo($login: String!) {
        user(login: $login) {
          name
          email
          bioHTML
        }
      }
    `,
    variables: { login: githubLogin },
  })
}
