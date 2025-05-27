import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/KotePiscine/', // Nom exact du dépôt GitHub
  server: {
    open: true,
    port: 3000
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // S'assurer que le fichier 404.html est inclus dans le build
        '404': resolve(__dirname, 'public/404.html')
      }
    }
  }
})
