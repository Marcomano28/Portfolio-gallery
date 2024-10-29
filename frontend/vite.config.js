import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  define: {
    __VITE_API_KEY__: `"${process.env.VITE_API_KEY}"`,
  },
  build: {
    sourcemap: true,
    // Asegura que el build se realice correctamente
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    // Configuración para desarrollo
    port: 5174,
    // Habilita los logs detallados
    hmr: {
      overlay: true
    }
  }
})
