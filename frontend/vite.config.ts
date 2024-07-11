import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import envCompatible from "vite-plugin-env-compatible"

export default defineConfig({
  envPrefix:"REACT_APP_",
  plugins: [react(),
    envCompatible()
  ],
  optimizeDeps: {
    include: ['@react-spring/web', 'framer-motion', 'react-icons']
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
