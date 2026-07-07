import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vsixPackager } from './vsix-plugin.js'

export default defineConfig({
  plugins: [vue(), vsixPackager()],
  base: './',
  assetsInclude: ['**/*.vsix'],
  build: {
    outDir: 'dist'
  }
})
