import { defineNuxtConfig } from 'nuxt/config'

import { siteName } from './layers/core/app/constants/site'

// Public origin of the site (override with NUXT_PUBLIC_SITE_URL): canonical and sitemap URLs are
// built from it.
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://alopedia.org'

// https://nuxt.com/docs/api/configuration/nuxt-config
// Host config. The areas are Nuxt layers in `layers/` (core, content), registered automatically.
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
    },
  },

  compatibilityDate: '2025-07-15',
  // Project components use file imports; Nuxt's built-ins are explicitly imported from #components.
  components: { dirs: [] },
  devtools: { enabled: true },

  experimental: {
    typedPages: true,
  },

  imports: {
    autoImport: false,
    scan: false,
  },

  modules: ['@nuxtjs/sitemap', 'nuxt-seo-utils', 'nuxt-schema-org'],

  nitro: {
    compressPublicAssets: { brotli: true, gzip: true },
    imports: false,
  },

  runtimeConfig: {
    public: {
      // The Yandex Metrica counter (NUXT_PUBLIC_YANDEX_METRICA_ID); empty turns analytics off.
      yandexMetricaId: '113946576',
    },
  },

  // The organization behind the site, for every page's structured data (nuxt-schema-org adds it
  // with the WebSite and WebPage nodes).
  schemaOrg: {
    identity: {
      name: siteName,
      type: 'Organization',
      url: siteUrl,
    },
  },

  // nuxt-seo-utils adds canonical, og:url, og:site_name, og:locale, og titles, and the
  // "Title · Алопедия" template. Pages without a title keep the plain site name.
  seo: {
    automaticTwitterTags: false,
    fallbackTitle: false,
  },

  site: {
    defaultLocale: 'ru',
    name: siteName,
    separator: '·',
    url: siteUrl,
  },

  // The sitemap finds the static pages from the routes; the content layer adds its sections and
  // articles.
})
