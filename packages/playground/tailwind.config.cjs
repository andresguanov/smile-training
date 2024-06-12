const { theme } = require('@alegradev/smile-ui-next');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const scrollbar = require('tailwind-scrollbar');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './src/App.vue'],
  theme: theme(colors),
  plugins: [require('tailwind-scrollbar')],
};
