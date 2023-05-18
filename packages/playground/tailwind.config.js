const { theme } = require('@alegradev/smile-ui-next/public/theme');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/components/*.{vue,js,ts,jsx,tsx}'],
  theme: theme(colors),
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('scrollbar', 'rounded');
    }),
    require('tailwind-scrollbar'),
  ],
};
