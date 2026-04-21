import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    root: '.',
    publicDir: false,
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../js/maplibre-viewer/src'),
        },
    },
    server: {
        port: 5173,
        open: true,
        fs: {
            allow: ['../../..']
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false
            },
            '/search': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false
            }
        }
    },
});