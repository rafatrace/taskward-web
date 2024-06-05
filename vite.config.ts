import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3002
  },
  plugins: [
    react(),
    basicSsl({
      /** name of certification */
      name: 'test',
      /** custom trust domains */
      domains: ['*.no'],
      /** custom certification directory */
      certDir: '/Users/rafaelmorais/.devServer/cert'
    }),
    TanStackRouterVite()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/')
    }
  }
})
