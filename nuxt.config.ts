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
  },
  runtimeConfig: {
    public: {
      OSS_BASE_URL: process.env.OSS_BASE_URL,
      API_BASE_URL:
        process.env.NODE_ENV === 'production'
          ? process.env.PROD_API_BASE_URL
          : process.env.DEV_API_BASE_URL,
    },
  },
  modules: ['@nuxt/icon', '@nuxt/content', '@nuxt/image','@pinia/nuxt'],
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