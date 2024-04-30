import { defineConfig } from 'vite';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue';

const rootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', '@vueuse/core'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
    lib: {
      entry: resolve(rootDir, './src/main.ts'),
      name: 'smile-ui-next',
      fileName: '[name]',
    },
  },
  resolve: {
    alias: [{ find: '~', replacement: resolve(rootDir, 'src') }],
  },
  plugins: [
    vue(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load components under `./src/components/`
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
      resolvers: [],
    }),
  ],
});
