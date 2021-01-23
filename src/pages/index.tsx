import GithubIcon from '@/assets/github.svg'
import { getPinnedRepositories } from '@/lib/api'
import { contactEmail, githubLogin } from '@/lib/constants'
import type { Awaited } from '@/types/utils'
import { GetStaticProps } from 'next'
import React from 'react'

interface Props {
  pinnedRepositories?: Extract<
    NonNullable<
      NonNullable<
        NonNullable<
          Extract<
            Awaited<
              ReturnType<typeof getPinnedRepositories>
            >['data']['repositoryOwner'],
            {
              __typename?: 'User'
            }
          >['pinnedItems']['edges']
        >[number]
      >['node']
    >,
    {
      __typename?: 'Repository'
    }
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
  let data
  try {
    const res = await getPinnedRepositories(githubLogin)
    data = res.data
  } catch (error) {
    throw new Error(error)
  }

  const pinnedRepositories =
    data?.repositoryOwner?.__typename === 'User'
      ? data.repositoryOwner.pinnedItems.edges?.reduce<
          NonNullable<Props['pinnedRepositories']>
        >((acc, edge) => {
          const node = edge?.node
          if (node?.__typename === 'Repository') {
            acc.push(node)
          }
          return acc
        }, [])
      : undefined

  return {
    props: {
      pinnedRepositories,
    },
    revalidate: 1,
  }
}

export default Home
