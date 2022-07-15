import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content="#ffffff"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content="#000000"
          />
          <meta name="description" content="Portfolio" />
          <meta
            name="keywords"
            content="Software Engineer, portfolio, frontend, backend, React, React Native, NestJS, nest, next, nextjs, tailwind, html, css, JavaScript, TypeScript, Node, nodejs, go, golang"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
