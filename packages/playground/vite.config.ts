import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';
import vue from '@vitejs/plugin-vue';

// Types
import type { RemotesConfig } from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    federation({
      name: 'app-alegra-expenses-payments',
      filename: 'remoteEntry.js',
      exposes: {
        './microfront': './src/main.ts',
      },
      remotes: {
        app_alegra_commons: {
          external: `https://almost-app-alegra-commons-vite.alegra.com/remoteEntry.js`,
          format: 'var',
          from: 'webpack',
        } as RemotesConfig,
      },
      shared: {
        vue: {
          shareScope: 'remote',
          version: '3.2.47',
        },
      },
    }),
    vue(),
  ],
  server: {
    host: 'dev.alegra.com',
    port: 1026,
  },
});
