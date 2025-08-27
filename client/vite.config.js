import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // <-- 1. IMPORT THE REACT PLUGIN
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(), // <-- 2. CALL BOTH PLUGINS IN THE ARRAY
  ],
  server: {
    proxy: {
      // This forwards any request starting with '/api' to your backend server
      '/api': {
        target: 'http://localhost:5000', // The address of your backend
        changeOrigin: true, // Recommended for this setup
      },
    },
  },
})