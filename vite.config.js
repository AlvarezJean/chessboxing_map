import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/',
          dest: './'
        }
      ]
    }),],
  build: {
    target: 'esnext',
    outDir: './dist',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/[name]-[hash][extname]';
          }

          if (/\.svg$/.test(name ?? '')) {
            return 'assets/[name]-[hash][extname]';
          }


          if (/\.css$/.test(name ?? '')) {
            return 'assets/scss/[name]-[hash][extname]';
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})
