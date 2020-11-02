import GithubIcon from 'assets/github.svg'

export const Home: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center h-full">
      <div className="max-w-4xl p-10">
        <div>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Archil Karchava
          </h1>
          <h2 className="text-xl font-semibold sm:text-3xl md:text-4xl">
            Software engineer
          </h2>
          <div className="my-6 text-lg sm:text-xl md:text-2xl">
            <h3 className="font-semibold">Technologies I use:</h3>
            <p>
              {[
                'React',
                'Redux',
                'TypeScript',
                'JavaScript',
                'HTML',
                'CSS',
                'SASS',
                'Webpack',
                'REST',
                'GraphQL',
                'Go',
                'Node.js',
                'Express',
                'NestJS',
                'PostgreSQL',
              ].join(' • ')}
            </p>
          </div>
        </div>
        <footer className="flex items-center">
          <a
            href="mailto:hello@archil.dev"
            className="mr-3 text-xl md:mr-4 md:text-2xl"
          >
            hello@archil.dev
          </a>{' '}
          <a
            title="My Github"
            href="https://github.com/archilkarchava"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon fill="currentColor" className="w-5 h-5 md:w-7 md:h-7" />
          </a>
        </footer>
      </div>
    </main>
  )
}

export default Home