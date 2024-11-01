// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Eugene Vinokurov | Frontend Developer'
    }
  },
  css: ['~/assets/scss/main.scss']
})
