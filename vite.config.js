import { defineConfig, loadEnv } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd());
    var VITE_APP_ENV = env.VITE_APP_ENV;
    return {
        base: VITE_APP_ENV === 'production' ? '/' : '/',
        plugins: [
            react(),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]'
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        server: {
            port: 8091,
            host: '0.0.0.0',
            open: true,
            proxy: {
                // https://cn.vitejs.dev/config/#server-proxy
                '/dev-api': {
                    target: 'http://localhost:8888/api/v1',
                    changeOrigin: true,
                    rewrite: function (p) { return p.replace(/^\/dev-api/, ''); }
                },
                '/prod-api': {
                    target: 'http://localhost:8888/api/v1',
                    changeOrigin: true,
                    rewrite: function (p) { return p.replace(/^\/prod-api/, ''); }
                }
            }
        }
    };
});
