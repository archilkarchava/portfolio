import GithubIcon from '@/assets/github.svg'
import { getPinnedRepositories, getProfileInfo } from '@/lib/api'
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'

export const getStaticProps = async () => {
  let data
  try {
    const res = await getPinnedRepositories(
      process.env.NEXT_PUBLIC_GITHUB_LOGIN,
      6
    )
    data = res.data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch user's pinned repositories", {
        cause: error,
      })
    }
  }

  const pinnedRepositories =
    data?.user?.pinnedItems.nodes?.flatMap((node) => {
      if (node && 'id' in node) {
        return node
      }
      return []
    }) ?? []

  let name = process.env.NEXT_PUBLIC_FULL_NAME
  let email = process.env.NEXT_PUBLIC_CONTACT_EMAIL

  if (!name || !email) {
    try {
      const profileRes = await getProfileInfo(
        process.env.NEXT_PUBLIC_GITHUB_LOGIN
      )
      name = name ?? profileRes.data.user?.name ?? ''
      email = email ?? profileRes.data.user?.email ?? ''
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to fetch github name and email', {
          cause: error,
        })
      }
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

type Props = InferGetStaticPropsType<typeof getStaticProps>

export function Home({ name, email, pinnedRepositories }: Props) {
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <main className="flex flex-col w-full h-full">
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
                href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_LOGIN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-current hover:opacity-70"
              >
                <GithubIcon className="w-6 h-6 sm:w-9 sm:h-9" />
              </a>
            </div>
          </div>
          {pinnedRepositories.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-2 text-2xl">Some of my projects:</h2>
              <ol className="flex flex-wrap -m-2">
                {pinnedRepositories.map((repo) => {
                  return (
                    <li
                      key={repo.id}
                      className="flex-grow w-full p-4 m-2 border border-gray-300 rounded-lg md:w-5/12 dark:border-gray-700"
                    >
                      <div>
                        <div className="flex flex-row">
                          {repo.homepageUrl && (
                            <div className="flex flex-col items-start mr-2 text-lg font-semibold">
                              <span>website: </span>
                              <span>code: </span>
                            </div>
                          )}
                          <div className="flex flex-col flex-grow text-lg font-semibold">
                            {repo.homepageUrl && (
                              <a
                                href={repo.homepageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span>{repo.homepageUrl}</span>
                              </a>
                            )}
                            <a
                              href={repo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span title={repo.name}>{repo.name}</span>
                            </a>
                          </div>
                        </div>
                        {repo.descriptionHTML && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: repo.descriptionHTML,
                            }}
                          />
                        )}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default Home
