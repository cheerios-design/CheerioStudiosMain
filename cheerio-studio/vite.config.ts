import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }, // <--- Make sure to close the 'resolve' block here with a comma

  // The server block goes here (outside of resolve)
  server: {
    allowedHosts: true,
  },
})