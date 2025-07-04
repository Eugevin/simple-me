// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Eugene Vinokurov | Frontend Developer',
      meta: [
        {
          name: 'description',
          content: 'Frontend Developer (Vue.js, TypeScript, JavaScript)',
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  css: ['~/assets/scss/main.scss'],
  compatibilityDate: '2024-04-03',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: '@use "~/assets/scss/_mixins.scss" as *;',
        },
      },
    },
  },
  eslint: {
    config: {
      stylistic: {
        semi: false,
      },
    },
  },
})
