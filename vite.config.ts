import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['individual-projects.ru', 'www.individual-projects.ru'],
  },
  server: {
    host: '0.0.0.0',
    port: 5177,
    allowedHosts: [
      'individual-projects.ru',
      'www.individual-projects.ru',
      'g40sl192-5173.euw.devtunnels.ms',
    ],
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
