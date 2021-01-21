import GithubIcon from '@/assets/github.svg'
import { PinnedRepositoriesQuery, Repository } from '@/types/generated'
import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { GetStaticProps } from 'next'
import React from 'react'

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@archil.dev'
const githubLogin = process.env.NEXT_PUBLIC_GITHUB_LOGIN ?? 'archilkarchava'

interface Props {
  pinnedRepositories?: Pick<
    Repository,
    'id' | 'name' | 'descriptionHTML' | 'url' | 'homepageUrl'
  >[]
}

export const Home: React.FC<Props> = ({ pinnedRepositories }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="max-w-4xl p-5 m-auto">
        <div>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            Archil Karchava
          </h1>
          <div className="flex items-center mt-1 text-2xl sm:mt-3 sm:text-4xl">
            <a href={`mailto:${contactEmail}`} className="mr-4">
              {contactEmail}
            </a>
            <a
              title="My Github"
              href={`https://github.com/${githubLogin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-current hover:opacity-70"
            >
              <GithubIcon className="w-6 h-6 sm:w-9 sm:h-9" />
            </a>
          </div>
        </div>
        {pinnedRepositories && (
          <div className="my-8">
            <h1 className="mb-2 text-2xl sm:text-3xl">Some of my projects:</h1>
            <div className="flex flex-wrap -m-2">
              {pinnedRepositories.map((repo) => (
                <div
                  key={repo.id}
                  className="flex-grow w-full p-4 m-2 border border-gray-300 rounded-lg md:w-5/12 dark:border-gray-700"
                >
                  <div>
                    <div className="flex flex-row flex-grow">
                      {repo.homepageUrl && (
                        <div className="flex flex-col items-start mr-2 text-lg font-semibold">
                          <span>website: </span>
                          <span>code: </span>
                        </div>
                      )}
                      <div className="flex flex-col flex-grow text-lg font-bold">
                        {repo.homepageUrl && (
                          <div>
                            <a
                              href={repo.homepageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span>{repo.homepageUrl}</span>
                            </a>
                          </div>
                        )}
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{repo.name}</span>
                        </a>
                      </div>
                    </div>
                    <div
                      className="text-base break-words"
                      dangerouslySetInnerHTML={{ __html: repo.descriptionHTML }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const GITHUB_GRAPHQL_API_ENDPOINT =
    process.env.GITHUB_GRAPHQL_API_ENDPOINT ?? 'https://api.github.com/graphql'
  const token = process.env.GITHUB_TOKEN
  const client = new ApolloClient({
    uri: GITHUB_GRAPHQL_API_ENDPOINT,
    headers: {
      Authorization: token ? `bearer ${token}` : '',
    },
    cache: new InMemoryCache(),
  })

  let data: PinnedRepositoriesQuery

  try {
    const res = await client.query<PinnedRepositoriesQuery>({
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
    data = res.data
  } catch (error) {
    throw new Error(error)
  }

  let pinnedRepositories: Pick<
    Repository,
    'id' | 'name' | 'descriptionHTML' | 'url' | 'homepageUrl'
  >[] = []

  if (data?.repositoryOwner?.__typename === 'User') {
    pinnedRepositories =
      data.repositoryOwner.pinnedItems.edges?.reduce((acc, edge) => {
        const node = edge?.node
        if (node?.__typename === 'Repository') {
          acc.push(node)
        }
        return acc
      }, pinnedRepositories) ?? []
  }

  return {
    props: {
      pinnedRepositories,
    },
    revalidate: 1,
  }
}

export default Home
