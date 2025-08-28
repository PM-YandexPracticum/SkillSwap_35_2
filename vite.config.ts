import { createRequire } from 'module'; // <- добавляем
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const require = createRequire(import.meta.url);

const { alias } = require('./aliases.cjs'); // <- корректный импорт CommonJS
// import { alias } from './aliases.cjs';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg'
    })
  ],
  css: {
    modules: {
      localsConvention: 'camelCase' // Чтобы обращаться как styles.myClass даже если в SCSS дефис
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/app/styles/variables/colors.scss";
          @import "@/app/styles/variables/fonts.scss";`
      }
    }
  },
  resolve: {
    alias
  },
  server: {
    port: 4000,
    open: true
  }
});
