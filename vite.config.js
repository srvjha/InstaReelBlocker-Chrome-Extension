import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// how to import crx
import { crx } from '@crxjs/vite-plugin'
import manifest from "./manifest.json"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()
    , crx({manifest})
  ]
})
