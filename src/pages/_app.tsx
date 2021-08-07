import { FULL_NAME } from '@/lib/constants'
import '@/styles/index.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { CookiesProvider } from 'react-cookie'
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Head>
        <title>{FULL_NAME}</title>
      </Head>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}

export default appWithTranslation(MyApp)
