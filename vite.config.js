// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/coin-toss/', // ✅ Set to your repo name
  plugins: [react()],
})
