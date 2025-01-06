export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: [
    "@pinia/nuxt",
    ["@nuxtjs/google-fonts", { families: { Montserrat: true } }],
  ],
  devtools: { enabled: true },
  css: ["bootstrap/dist/css/bootstrap.min.css"],
});
