import GithubIcon from '@/assets/github.svg'
import { getPinnedRepositories, getProfileInfo } from '@/lib/api'
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'

export const config = {
  unstable_runtimeJS: false,
}

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
      <main className="flex h-full w-full flex-col">
        <div className="m-auto max-w-4xl p-5">
          <div>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
              {name}
            </h1>
            <div className="mt-1 flex items-center text-2xl sm:mt-3 sm:text-4xl">
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
                <GithubIcon className="h-6 w-6 sm:h-9 sm:w-9" />
              </a>
            </div>
          </div>
          {pinnedRepositories.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-2 text-2xl">Some of my projects:</h2>
              <ol className="-m-2 flex flex-wrap">
                {pinnedRepositories.map((repo) => {
                  return (
                    <li
                      key={repo.id}
                      className="m-2 w-full flex-grow rounded-lg border border-gray-300 p-4 dark:border-gray-700 md:w-5/12"
                    >
                      <div>
                        <div className="flex flex-row">
                          {repo.homepageUrl && (
                            <div className="mr-2 flex flex-col items-start text-lg font-semibold">
                              <span>website: </span>
                              <span>code: </span>
                            </div>
                          )}
                          <div className="flex flex-grow flex-col text-lg font-semibold">
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
                              <span>{repo.name}</span>
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
