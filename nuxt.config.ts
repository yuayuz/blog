// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr:true,
  css: [
    '~/assets/css/main.css',
    '~/assets/styles/main.styl',  // 引入 Stylus 文件
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
    proxy: {
      '/api': {
        target:  process.env.DEV_API_PROXY || 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
  },
  runtimeConfig: {
    public: {
      OSS_BASE_URL: process.env.OSS_BASE_URL,
      API_BASE_URL: process.env.API_BASE_URL || '/api',
    },
  },
  modules: ['@nuxt/icon', '@nuxt/content', '@nuxt/image'],
  icon: {
    mode: 'css',
    cssLayer: 'base',
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './assets/my-icons'
      },
    ],
  },
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  }
})