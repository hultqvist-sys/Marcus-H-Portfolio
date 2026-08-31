import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Honour PORT when the environment assigns one (preview harnesses, CI),
    // otherwise keep the usual local default.
    port: Number(process.env.PORT) || 5173,
    open: true,
  }
})
