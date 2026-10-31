import { defineNuxtConfig } from 'nuxt/config'

import { contactEmail, siteName } from './layers/core/app/constants/site'

// Public origin of the site (override with NUXT_PUBLIC_SITE_URL): canonical and sitemap URLs are
// built from it.
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://alopedia.org'

// https://nuxt.com/docs/api/configuration/nuxt-config
// Host config. The areas are Nuxt layers in `layers/` (core, content), registered automatically.
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      // Icons in `public/`: SVG for current browsers, ICO for the rest, 120px for Yandex's search
      // results, 180px for iOS home screens.
      link: [
        { href: '/favicon.svg', rel: 'icon', type: 'image/svg+xml' },
        { href: '/favicon.ico', rel: 'icon', sizes: '32x32' },
        { href: '/icon-120.png', rel: 'icon', sizes: '120x120', type: 'image/png' },
        { href: '/apple-touch-icon.png', rel: 'apple-touch-icon' },
      ],
      meta: [{ content: '#23786b', name: 'theme-color' }],
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

  routeRules: {
    // HTTPS only from now on (no preload: that can't be undone quickly), and no MIME sniffing.
    '/**': {
      headers: {
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Strict-Transport-Security': 'max-age=31536000',
        'X-Content-Type-Options': 'nosniff',
      },
    },
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
      email: contactEmail,
      logo: `${siteUrl}/icon-512.png`,
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
