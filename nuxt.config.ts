// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/fonts'],
  colorMode: {
    preference: 'light'
  },
  app: {
    head: {
      script: [
        {
          src: 'https://umami.cr.bswatcher.com/script.js',
          'data-website-id': 'f1439093-e84e-4c8b-92d8-0db2e3d7f2e4',
          async: true,
          defer: true,
        }
      ]
    }
  }
})