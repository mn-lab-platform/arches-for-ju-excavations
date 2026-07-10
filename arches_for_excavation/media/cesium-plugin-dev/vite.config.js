import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const cesiumBaseUrl = '/cesiumStatic/node_modules/cesium/Build/Cesium/';
const cesiumSource = 'node_modules/cesium/Build/Cesium';

export default defineConfig({
  root: '.',
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../js/cesium-plugin/src'),
    },
  },
  server: {
    port: 5173,
    open: true,
    fs: {
      allow: ['../../..'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/search': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/resource': { // <--- add this block
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: `${cesiumSource}/ThirdParty`, dest: 'cesiumStatic' },
        { src: `${cesiumSource}/Workers`, dest: 'cesiumStatic' },
        { src: `${cesiumSource}/Assets`, dest: 'cesiumStatic' },
        { src: `${cesiumSource}/Widgets`, dest: 'cesiumStatic' },
      ],
    }),
  ],
  define: {
    CESIUM_BASE_URL: JSON.stringify(cesiumBaseUrl),
  },
});