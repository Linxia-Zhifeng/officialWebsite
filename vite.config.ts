import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // 现代浏览器目标：跳过无谓的语法降级，产物更小
    target: 'es2020',
    // 单 chunk 超过 1000KB 才警告
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // 第三方依赖单独分包，业务改动不会让 vendor 缓存整体失效
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue-i18n') || id.includes('@intlify')) return 'i18n'
            if (id.includes('vue-router')) return 'router'
            if (id.includes('@vue') || id.includes('/vue/')) return 'vue'
          }
          return undefined
        }
      }
    }
  }
})
