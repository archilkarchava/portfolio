import '@/styles/index.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {!!process.env.NEXT_PUBLIC_FULL_NAME && (
          <title>{process.env.NEXT_PUBLIC_FULL_NAME}</title>
        )}
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
