import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Kote-Piscine-WebSite/', // Remplacez par le nom de votre dépôt
})
