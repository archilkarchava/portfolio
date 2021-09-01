import { LocaleToggle } from '@/components/LocalleToggle'
import { FULL_NAME } from '@/lib/constants'
import '@/styles/index.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { i18n as i18nConfig } from '../../next-i18next.config'

const { locales } = i18nConfig

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Head>
        <title>{FULL_NAME}</title>
      </Head>
      {locales.length === 2 ? (
        <LocaleToggle locales={locales as [string, string]} />
      ) : null}
      <Component {...pageProps} />
    </CookiesProvider>
  )
}

export default appWithTranslation(MyApp)
