const withPreact = require('next-plugin-preact')

/**
 * @type {import('next').NextConfig['webpack']}
 */
const webpackConfig = (config) => {
  // Import svg
  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'removeViewBox',
                active: false,
              },
            ],
          },
        },
      },
    ],
  })
  return config
}

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: webpackConfig,
  webpack5: true,
}

module.exports = withPreact(nextConfig)
