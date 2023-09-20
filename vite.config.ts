import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-electron-plugin';
import { alias, copy } from 'vite-electron-plugin/plugin'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), electron({
    include: ['app'],
    plugin: [
      alias([
        {
          find: '@app',
          replacement: path.join(__dirname, 'app')
        }
      ]),
      copy([ { form: 'electron-builder.json', to: 'dist-electron/app.json' } ])
    ]
  })],
  clearScreen: false,
  server: {
    port: 10000,
    strictPort: true,
    proxy: {
      '^/api': {
        target: "http://localhost:8088",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
      
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
})
