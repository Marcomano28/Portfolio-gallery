import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  define: {
    // Asegura que las variables de entorno estén disponibles
    'process.env': process.env
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
