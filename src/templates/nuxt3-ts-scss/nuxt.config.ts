// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    autoImport: false,
  },
  features: {
    inlineStyles: false,
  },
  srcDir: 'src',
  css: ['@/assets/styles/global.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/styles/variables.scss";
            @import "@/assets/styles/mixins.scss";
          `,
        },
      },
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['.ts'],
    },
  ],
  modules: [
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    'nuxt-viewport',
    '@nuxt/image',
    'nuxt-svgo',
    '@vueuse/nuxt',
    '@vueuse/nuxt',
    'nuxt-schema-org',
    'nuxt-simple-sitemap',
  ],
  googleFonts: {
    overwriting: true,
    preload: true,
    families: {
      Roboto: [100, 400, 500, 700],
      download: true,
    },
    subsets: ['cyrillic', 'latin'],
  },
  image: {
    domains: [process.env.NUXT_PUBLIC_API_DOMAIN as string],
    format: ['webp', 'jpg', 'png'],
  },
  svgo: {
    autoImportPath: './assets/icons/',
    componentPrefix: 'Ic',
    svgoConfig: {
      multipass: true,
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              // or disable plugins
              removeDoctype: false,
              removeViewBox: false,
              cleanupIds: false,
            },
          },
        },
      ],
    },
  },
  viewport: {
    breakpoints: {
      mobile: 768,
      tabletSmall: 769,
      tablet: 1024,
      desktop: 1025,
    },
    cookie: {
      name: 'viewport',
    },
    defaultBreakpoints: {
      mobile: 'mobile',
      tabletSmall: 'tabletSmall',
      tablet: 'tablet',
      desktop: 'desktop',
    },
    fallbackBreakpoint: 'desktop',
  },
  site: {
    url: process.env.NUXT_PUBLICK_BASE_APP_URL,
    name: process.env.NUXT_PUBLICK_BASE_APP_URL,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      baseURL: process.env.NUXT_PUBLICK_BASE_APP_URL,
    },
  },
});
