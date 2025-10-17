// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/i18n"],
  css: ["@/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "ar",
    locales: [
      {
        code: "en",
        iso: "en",
        file: "en.yaml",
        dir: "ltr",
      },
      {
        code: "ar",
        iso: "ar",
        file: "ar.yaml",
        dir: "rtl",
      },
    ],
  },
});
