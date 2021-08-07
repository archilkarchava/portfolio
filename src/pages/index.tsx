import GithubIcon from '@/assets/github.svg'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { getPinnedRepositories, getProfileInfo } from '@/lib/api'
import { EMAIL, FULL_NAME, GITHUB_LOGIN } from '@/lib/constants'
import type { Awaited } from '@/types/utils'
import { GetStaticProps } from 'next'
import xss from 'xss'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import React from 'react'

interface Props {
  name: string
  email: string
  pinnedRepositories: Extract<
    NonNullable<
      NonNullable<
        Awaited<ReturnType<typeof getPinnedRepositories>>['data']['user']
      >['pinnedItems']['nodes']
    >[number],
    { id: string }
  >[]
}

export const Home: React.FC<Props> = ({ name, email, pinnedRepositories }) => {
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <LanguageSwitcher />
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
                href={`https://github.com/${GITHUB_LOGIN}`}
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
              <h1 className="mb-2 text-2xl">{t('my-projects')}</h1>
              <div className="flex flex-wrap -m-2">
                {pinnedRepositories.map((repo) => {
                  return (
                    <div
                      key={repo.id}
                      className="flex-grow w-full p-4 m-2 border border-gray-300 rounded-lg md:w-5/12 dark:border-gray-700"
                    >
                      <div>
                        <div className="flex flex-row">
                          {repo.homepageUrl && (
                            <div className="flex flex-col items-start mr-2 text-lg font-semibold">
                              <span>{t('website')}</span>
                              <span>{t('code')}</span>
                            </div>
                          )}
                          <div className="flex flex-col flex-grow text-lg font-bold">
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
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale = 'en',
}) => {
  const translations = await serverSideTranslations(locale, ['common'])
  let data
  try {
    const res = await getPinnedRepositories(GITHUB_LOGIN, 6)
    data = res.data
  } catch (error) {
    throw new Error(error)
  }

  const pinnedRepositories =
    data.user?.pinnedItems.nodes?.flatMap((node) => {
      if (node && 'id' in node) {
        // Github already purifies HTML for us,
        // we are doing it one more time just in case
        return { ...node, descriptionHTML: xss(node.descriptionHTML) }
      }
      return []
    }) ?? []

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
      ...translations,
    },
    revalidate: 1,
  }
}

export default Home
