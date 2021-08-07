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
      <main className="w-full h-full">
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
