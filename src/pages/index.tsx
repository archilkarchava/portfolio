import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import GithubIcon from '@assets/github.svg'
import { GetStaticProps } from 'next'

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@archil.dev'
const githubLogin = process.env.NEXT_PUBLIC_GITHUB_LOGIN ?? 'archilkarchava'

interface Props {
  pinnedRepositories: {
    __typename: 'Repository'
    id: string
    name: string
    descriptionHTML: string
    url: string
  }[]
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
        <div className="my-8">
          <h1 className="mb-2 text-2xl sm:text-4xl">Some of my projects:</h1>
          <div className="flex flex-wrap -m-2">
            {pinnedRepositories.map((repo) => (
              <div
                key={repo.id}
                className="flex-grow w-full p-4 m-2 border border-gray-300 rounded-lg md:w-5/12 dark:border-gray-700"
              >
                <div className="">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold"
                  >
                    <span>{repo.name}</span>
                  </a>
                  <div
                    className="text-base break-words"
                    dangerouslySetInnerHTML={{ __html: repo.descriptionHTML }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
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
      Authorization: token ? `bearer ${token}` : null,
    },
    cache: new InMemoryCache(),
  })

  let data: {
    repositoryOwner: {
      pinnedItems: {
        edges: {
          node: Props['pinnedRepositories'][number]
        }[]
      }
    }
  }
  try {
    const res = await client.query({
      query: gql`
        query PinnedRepositories {
          repositoryOwner(login: "${githubLogin}") {
            ... on User {
              pinnedItems(first: 6) {
                edges {
                  node {
                    ... on Repository {
                      id
                      name
                      descriptionHTML
                      url
                    }
                  }
                }
              }
            }
          }
        }
      `,
    })
    data = res.data
  } catch (error) {
    throw new Error(error)
  }

  const pinnedRepositories = data?.repositoryOwner.pinnedItems.edges.map(
    (edge) => edge.node
  )

  return {
    props: {
      pinnedRepositories,
    },
  }
}

export default Home
