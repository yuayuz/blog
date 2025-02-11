// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  css: [
    '~/assets/css/main.css',
    '~/assets/styles/main.styl',  // 引入 Stylus 文件
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    'vuetify-nuxt-module',
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: './vuetify.config.ts' // <== you can omit it

  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
