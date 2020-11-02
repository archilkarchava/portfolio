import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'preact/debug'
import 'styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="theme-color" content="#ffffff" />
        <title>Archil Karchava</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
