// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  ssr: true,

  css: [
    '~/assets/css/main.css',
    '~/assets/css/github-markdown.css',
    '~/assets/styles/main.styl',
  ],

  vite: {
    plugins: [tailwindcss()],
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

  modules: ['@nuxt/icon', '@nuxt/content', '@nuxt/image', '@pinia/nuxt'],

  icon: {
    mode: 'css',
    cssLayer: 'base',
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './assets/my-icons',
      },
    ],
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
      title: '谁是谁',
      titleTemplate: '%s - 谁是谁',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content: '个人博客',
        },
        {
          name: 'referrer',
          content: 'strict-origin-when-cross-origin',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.svg',
        },
      ],
    },
  },

  compatibilityDate: '2024-11-01',

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
})
