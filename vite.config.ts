import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        tags: [
          {
            injectTo: 'head-prepend',
            tag: 'link',
            attrs: {
              rel: 'preload',
              href: 'src/assets/fonts/subset-PretendardVariable-Regular.woff2',
              as: 'font',
              type: 'font/woff2',
              crossorigin: 'anonymous',
            },
          },
        ],
      },
    }),
    react(),
    visualizer({
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
