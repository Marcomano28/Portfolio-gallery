import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 3000, // Aumentamos el límite de advertencia
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // Separar las fuentes en su propio chunk
          // fonts: [
          //   /assets.*\.ttf$/,
          //   /assets.*\.woff$/,
          //   /assets.*\.woff2$/
          // ]
        }
      }
    }
  },
  // define: {
  //   // Aseguramos que las variables de entorno estén disponibles
  //   'import.meta.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
  //   'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  //   'import.meta.env.VITE_API_KEY_TZ': JSON.stringify(process.env.VITE_API_KEY_TZ)
  // }
})
