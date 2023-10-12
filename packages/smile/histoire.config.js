import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';
import { defaultColors } from 'histoire';

export default defineConfig({
  plugins: [HstVue()],
  setupFile: '/src/stories/config/histoire.setup.js',
  theme: {
    title: 'Smile Ui.',
    // logo: {
    //   square: "./img/square.png",
    //   light: "./img/light.png",
    //   dark: "./img/dark.png",
    // },
    // logoHref: "https://acme.com",
    // favicon: "./favicon.ico",
    colors: {
      // #1a1a1a
      gray: {
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        // 700: "#242424",
        // 750: "#1a1a1a",
        700: '#1e1e20',
        750: '#161618',
        // 700: "#111827",
        // 750: "#0d121b",
        800: '#27272a',
        850: '#1f1f21',
        900: '#18181b',
        950: '#101012',
      },
      // primary: {
      //   50: "#EBFAFA",
      //   100: "#CFF2F1",
      //   200: "#B6ECE9",
      //   300: "#9BE4E0",
      //   400: "#86DFDC",
      //   500: "#30BBB7",
      //   600: "#30ABA9",
      //   700: "#299E9C",
      //   800: "#208D8D",
      //   900: "#1A7E7F",
      // },
      primary: {
        50: '#F3F1FD',
        100: '#E5E4FB',
        200: '#D2D2F9',
        300: '#C5C5F6',
        400: '#A6A6F2',
        500: '#837FF3',
        600: '#736FE2',
        700: '#5E5EBA',
        800: '#4D4E97',
        900: '#3D3D75',
      },
    },
  },
});
