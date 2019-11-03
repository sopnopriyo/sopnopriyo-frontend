import colors from 'vuetify/es5/util/colors'
const development = process.env.NODE_ENV !== 'production'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s' || 'Sopnopriyo',
    title: 'Sopnopriyo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: "description",
        name: "description",
        content:
          "Sopnopriyo helps Software Engineers by sharing real life engineering chalenges and solutions"
      },
      {
        hid: "og:title",
        name: "og:title",
        content:
          "Sopnopriyo - Tech research findings, reviews, stories and updates from Sopnopriyo !"
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Sopnopriyo helps Software Engineers by sharing real life engineering chalenges and solutions"
      },
      {
        hid: "og:type",
         name: "og:type",
        content: "website" 
      },
      {
        hid: "og:url",
        name: "og:url",
        content: "https://sopnopriyo.com/" 
      },
      {
        hid: "og:image",
        hid: "og:image",
name: "og:image",
        content: "https://sopnopriyo.com/img/opengraph/home.jpg"
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' }
    ],
    script: [
    ],
  },
  env: {
    DEV_API: 'http://localhost:3000/api',
    PROD_API: 'https://sopnopriyo.com/api'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    // SCSS file in the project
    '@/assets/css/main.scss'
  ],
  styleResources:{
  },
  generate: {
    subFolders: true
  },

  router: {
    base: '/'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
 buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
    '@nuxtjs/style-resources',
    '@nuxtjs/markdownit'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    //baseUrl: development ? 'http://localhost:3000' : 'https://www.sopnopriyo.com',
    proxy: true // Can be also an object with default options
  },
  proxy: {
    '/api/': 'https://sopnopriyo.com',
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          // primary: colors.blue.darken2,
          // accent: colors.grey.darken3,
          // secondary: colors.amber.darken3,
          // info: colors.teal.lighten1,
          // warning: colors.amber.base,
          // error: colors.deepOrange.accent4,
          // success: colors.green.accent3
        }
      }
    }
  },
    // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true,
    use: [
      'markdown-it-div',
      'markdown-it-attrs'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
