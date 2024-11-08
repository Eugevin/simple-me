// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Eugene Vinokurov | Frontend Developer',
      meta: [
        { name: 'description', content: 'Frontend Developer (Vue.js, TypeScript, JavaScript)' }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: '@use "~/assets/scss/_media.scss" as *;'
        }
      }
    }
  },
  css: ['~/assets/scss/main.scss']
})