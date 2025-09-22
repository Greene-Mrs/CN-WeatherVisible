import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    /* server: {
        port: 3008, // 设置端口号
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3007',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        },
    },     */
    plugins: [vue()],
    // 配置@根路径
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    base: 'http://127.0.0.1:3007/',
});
