import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/KotePiscine/', // Nom exact du dépôt GitHub
    server: {
        open: true,
        port: 3000
    }
});
