import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  // GitHub Pages部署配置
  base: process.env.NODE_ENV === 'production' ? '/ivan-universe/' : '/'
})