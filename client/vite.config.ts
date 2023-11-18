import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      mode: process.env.VITE_NODE_ENV === 'production' ? 'production' : 'development',
      workbox: {
        globPatterns: ['**/*.{ts,tsx,js,jsx,css,scss,html,ico,png,svg,gift}']
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'android-chrome-192x192.png',
        'android-chrome-512x512.png'
      ],
      manifest: {
        name: 'Kanjigami App',
        short_name: 'kanjigami',
        description: 'Practice & learning kanji website',
        theme_color: '#FFFFFF',
        icons: [
          { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/favicon.ico', purpose: 'maskable' }
        ],
        display: 'standalone',
        scope: '/',
        start_url: '/'
      }
    })
  ],
  server: {
    watch: {
      usePolling: true
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000 // app port
  },
  resolve: {
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }]
  }
})
