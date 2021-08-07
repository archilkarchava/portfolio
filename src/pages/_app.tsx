import { FULL_NAME } from '@/lib/constants'
import '@/styles/index.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{FULL_NAME}</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
