import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    port: 0,          // Let Vite choose ANY free port
    strictPort: false // Don't show "Port is in use" errors
  }
})
