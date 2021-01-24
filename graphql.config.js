require('dotenv').config({ path: './.env.local' })

const { GITHUB_TOKEN } = process.env

const defaultSchema = {
  'https://api.github.com/graphql': {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  },
}

module.exports = {
  projects: {
    default: {
      schema: [defaultSchema],
      documents: 'src/**/!(*.d).{graphql,js,jsx,ts,tsx}',
      extensions: {
        codegen: {
          generates: {
            'src/types/generated.d.ts': {
              plugins: ['typescript', 'typescript-operations'],
              config: {
                skipTypename: true,
                useTypeImports: true,
                noExport: true,
              },
            },
          },
        },
      },
    },
  },
}
