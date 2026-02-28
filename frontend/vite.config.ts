import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Game Server WebSocket (Lobby/Master)
      '/socket': {
        target: 'http://localhost:8080',
        ws: true,
        rewrite: (path) => path.replace(/^\/socket/, ''),
      },
      // Web Server API
      '/api': {
        target: 'http://localhost:80',
        changeOrigin: true,
      },
      // Legacy Login/Session routes
      '/login': {
        target: 'http://localhost:80',
        changeOrigin: true,
      },
      '/logout': {
        target: 'http://localhost:80',
        changeOrigin: true,
      },
    },
  },
})
