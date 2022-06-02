export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TitanicProject',
    htmlAttrs: {
      lang: 'fr',
    },

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
  },
  server: {
    port: 8000,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/css/global.css", 'boxicons/css/boxicons.min.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuesax.js', mode: 'client', ssr: false },
    { src: '~/plugins/doughnutChart.js', mode: 'client' },
    { src: '~/plugins/barChart.js', mode: 'client' }
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],



  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
    proxy: true
  },


  proxy: {
    // Simple proxy
    "/api/": {
      target: "http://localhost:3000",
      pathRewrite: { "^/api/": "" }
    }
  }
  ,
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
