const withPreact = require('next-plugin-preact')

const webpackConfig = (config) => {
  // Import svg
  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: {
              removeViewBox: false,
            },
          },
        },
      },
    ],
  })
  return config
}

module.exports = withPreact({
  webpack: webpackConfig,
  webpack5: true,
})
