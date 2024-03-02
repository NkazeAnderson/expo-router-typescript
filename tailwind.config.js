/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: 'poppins',
    colors: {
      lightBackground: '#fcfcfc',
      whiteText: '#ffffff',
      grayBackground: '#f1f1f1',
      grayText: '#6d5b5b',
      primary: '#4a43eb',
      secondary: '#38d1f1',
      danger: '#f0635a',
      primaryText: '#333333',
      green: '#0a6b49',
      orange: '#ff5432'
    },
    extend: {}
  },
  plugins: []
}
