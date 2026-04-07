import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true
      },
      workbox: {
        clientsClaim: true,
        maximumFileSizeToCacheInBytes: 4000000,
        skipWaiting: true,
        globPatterns: ['**/*{png,svg,mp3,jpg,js,css,html}'],
        runtimeCaching: [,
          {
            urlPattern: ({ url }) =>
          url.pathname.match(/\.(png|jpg|jpeg|svg)$/),
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          },
          {
            urlPattern: ({ url }) =>
          url.pathname.match(/\.(mp3|wav|ogg|m4a)$/i),
            handler: 'CacheFirst',
            options: {
              cacheName: 'audio',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
      }
    })
  ],
  base: mode === 'gh-pages' ? '/SP-Croak-Counter/' : '/', // Base path for GitHub Pages deployment
}))