const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const customJestConfig = {
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@/lib/api$': '<rootDir>/src/test/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)()
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      // Workaround to put our SVG stub first
      '\\.svg': '<rootDir>/src/test/__mocks__/svg.js',
      ...nextJestConfig.moduleNameMapper,
    },
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = jestConfig
