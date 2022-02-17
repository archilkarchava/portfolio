const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'media', // 'media' or 'class'
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
  },
}
