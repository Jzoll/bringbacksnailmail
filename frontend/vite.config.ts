import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/health': 'http://localhost:8000',
      '/prompts': 'http://localhost:8000',
      '/auth': 'http://localhost:8000',
      '/mail': 'http://localhost:8000',
      '/images': 'http://localhost:8000',
    }
  }
})
