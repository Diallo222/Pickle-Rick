export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: [
    "@pinia/nuxt",
    ["@nuxtjs/google-fonts", { families: { Montserrat: true } }],
  ],
  plugins: ["~/plugins/toast.js"],
  devtools: { enabled: true },
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  runtimeConfig: {
    public: {
      emailJsServiceId: process.env.VITE_EMAILJS_SERVICE_ID,
      emailJsTemplateId: process.env.VITE_EMAILJS_TEMPLATE_ID,
      emailJsPublicKey: process.env.VITE_EMAILJS_PUBLIC_KEY,
    },
  },
});
