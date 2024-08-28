// const { theme } = require('./src/utils/theme');
// const colors = require('tailwindcss/colors');
// const plugin = require('tailwindcss/plugin');

// module.exports = {
//   content: ['./index.html', './src/components/*.{vue,js,ts,jsx,tsx}'],
//   theme: theme(colors),
//   plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
// };
import { theme } from './src/utils/theme';

export default {
  content: ['./index.html', './src/components/*.{vue,js,ts,jsx,tsx}'],
  theme: theme(),
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
