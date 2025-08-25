import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'ShopMate',
        short_name: 'ShopMate',
        description: 'Organize your shopping list easily',
        theme_color: '#1976d2',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/favicon/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: '/screenshot1.png',
            sizes: '512x200',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: '/screenshot2.png',
            sizes: '1440x720',
            type: 'image/png',
            form_factor: 'wide',
          },
        ],
      },
    }),
  ],
  server: {
    host: true,   
    port: 5173,
  },
})
