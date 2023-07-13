import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/InmovalWeb/',
  plugins: [vue()],
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
})
