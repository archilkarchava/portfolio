// @ts-check
/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */
const { z } = require('zod')

function validateEnv() {
  const envSchema = z.object({
    GITHUB_GRAPHQL_API_ENDPOINT: z.string().url(),
    GITHUB_TOKEN: z.string(),
    NEXT_PUBLIC_CONTACT_EMAIL: z.string().email().optional(),
    NEXT_PUBLIC_FULL_NAME: z.string().optional(),
    NEXT_PUBLIC_GITHUB_LOGIN: z.string(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
  })

  const env = envSchema.safeParse(process.env)

  if (!env.success) {
    console.error(
      '❌ Invalid environment variables:',
      JSON.stringify(env.error.format(), null, 4)
    )
    process.exit(1)
  }
  return env.data
}
module.exports = validateEnv
