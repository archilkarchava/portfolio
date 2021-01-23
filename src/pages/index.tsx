import GithubIcon from '@/assets/github.svg'
import { getPinnedRepositories, getProfileInfo } from '@/lib/api'
import { EMAIL, FULL_NAME, GITHUB_LOGIN } from '@/lib/constants'
import type { Awaited } from '@/types/utils'
import { GetStaticProps } from 'next'
import React from 'react'

interface Props {
  name: string
  email: string
  pinnedRepositories: NonNullable<
    NonNullable<
      NonNullable<
        Awaited<ReturnType<typeof getPinnedRepositories>>['data']['user']
      >['pinnedItems']['nodes']
    >[number]
  >[]
}

export const Home: React.FC<Props> = ({ name, email, pinnedRepositories }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="max-w-4xl p-5 m-auto">
        <div>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            {name}
          </h1>
          <div className="flex items-center mt-1 text-2xl sm:mt-3 sm:text-4xl">
            <a href={`mailto:${email}`} className="mr-4">
              {email}
            </a>
            <a
              title="My Github"
              href={`https://github.com/${GITHUB_LOGIN}`}
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
    const res = await getPinnedRepositories(GITHUB_LOGIN, 6)
    data = res.data
  } catch (error) {
    throw new Error(error)
  }
  const pinnedRepositories = data.user?.pinnedItems.nodes?.filter(
    (node) => node
  ) as Props['pinnedRepositories']

  let name = FULL_NAME
  let email = EMAIL

  if (!name || !email) {
    try {
      const profileRes = await getProfileInfo(GITHUB_LOGIN)
      if (!name) {
        name = profileRes.data.user?.name || ''
      }
      if (!email) {
        email = profileRes.data.user?.email || ''
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    props: {
      name,
      email,
      pinnedRepositories,
    },
    revalidate: 1,
  }
}

export default Home
