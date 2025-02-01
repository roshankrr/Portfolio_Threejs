import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '3D Portfolio',
        short_name: '3D Portfolio',
        description: 'Interactive 3D Portfolio Website',
        theme_color: '#000000',
        icons: [
          {
            src: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Cdemu_192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
