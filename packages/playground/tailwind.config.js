const { theme } = require('@alegradev/smile-ui-next/theme');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './src/App.vue'],
  theme: theme(colors),
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('scrollbar', 'rounded');
    }),
    require('tailwind-scrollbar'),
  ],
};
