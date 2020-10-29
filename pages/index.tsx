import Head from 'next/head'

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10">
      <Head>
        <title>Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main>
          <h1 className="text-6xl font-bold leading-tight">Archil Karchava</h1>
          <h2 className="text-4xl font-semibold">Software engineer</h2>
        </main>
        <footer className="flex items-center my-8">
          <a href="mailto:hello@archil.dev" className="mr-4 text-2xl">
            hello@archil.dev
          </a>{' '}
          <a
            href="https://github.com/archilkarchava"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/github.svg" alt="Github Logo" className="h-7" />
          </a>
        </footer>
      </div>
    </div>
  )
}

export default Home
