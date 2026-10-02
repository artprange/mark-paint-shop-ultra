import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Precisa vir antes do plugin do React: ele gera o routeTree.gen.ts a
    // partir de src/routes, e o React precisa processar o resultado.
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
  ],
})
