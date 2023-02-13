const colors = require('tailwindcss/colors');
const { theme } = require('@alegradev/smile-ui-next/dist/theme');

module.exports = {
  content: ['./*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: theme(colors),
  plugins: [],
};
