import fs from 'fs'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: 'learning.local', // Match your app URL
    hmr: {
      clientPort: 5173, // Ensure port matches
    },
    https: {
      key: fs.readFileSync('/home/anuj/.local/share/mkcert/learning.local-key.pem'),
      cert: fs.readFileSync('/home/anuj/.local/share/mkcert/learning.local.pem')
    }
  }
})