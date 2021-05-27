import { FULL_NAME } from '@/lib/constants'
import '@/styles/index.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#ffffff" />
        <title>{FULL_NAME}</title>
      </Head>
      <main className="w-full h-full">
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
