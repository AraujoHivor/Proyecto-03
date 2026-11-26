import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Ruta base necesaria para publicar en GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: '/Proyecto-03/',
})
