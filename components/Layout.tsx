import Head from 'next/head'
import React from 'react'

interface Props {
  title?: string
}

const Layout: React.FC<Props & JSX.IntrinsicElements['main']> = ({
  children,
  title,
  ...rest
}) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>
          {title ? `${title} | Archil Karchava` : 'Archil Karchava'}
        </title>
      </Head>
      <main {...rest}>{children}</main>
    </>
  )
}

export default Layout
