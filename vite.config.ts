import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { alias } from './aliases';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase' // Чтобы обращаться как styles.myClass даже если в SCSS дефис
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/app/styles/variables.scss";` // глобальные переменные/миксины
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