const path = require('path');

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  target: "static",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "CotuCotu",
    htmlAttrs: {
      lang: "ja",
      prefix: "og: http://ogp.me/ns#"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "CotuCotuは、は、することの回数を記録し継続をサポートするサービスです。"
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "CotuCotu"
      },
      { hid: "og:type", property: "og:type", content: "website" },
      // { hid: "og:url", property: "og:url", content: "" },
      {
        hid: "og:title",
        property: "og:title",
        content: "CotuCotu"
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "CotuCotuは、は、することの回数を記録し継続をサポートするサービスです。"
      },
      // {
      //   hid: "og:image",
      //   property: "og:image",
      //   content: ""
      // },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@kanoi_y" }
    ],
    link: [{ rel: "icon", type: "image/svg+xml", href: "/cotucotu_logo.svg" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/firebase.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/style-resources", "nuxt-fontawesome"],

  styleResources: {
    scss: ["~/assets/scss/variables.scss", "~/assets/scss/media.scss"]
  },

  fontawesome: {
    imports: [
      {
        set: "@fortawesome/free-solid-svg-icons",
        icons: [
          "faBook",
          "faRunning",
          "faDumbbell",
          "faPen",
          "faLaptopCode",
          "faMusic",
          "faCar",
          "faPalette",
          "faPhotoVideo",
          "faSeedling",
          "faUtensils",
          "faLongArrowAltLeft",
          "faChevronLeft",
          "faChevronRight"
        ]
      }
    ]
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
