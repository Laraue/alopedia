import { fileURLToPath } from 'node:url'

import { defineNuxtConfig } from 'nuxt/config'

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// The content: home, section and article pages, the server that renders the markdown, and the
// contracts between them.
export default defineNuxtConfig({
  // The articles (`content/`) are bundled with the server and read by
  // `server/content/useContentCatalog`.
  nitro: {
    serverAssets: [{ baseName: 'articles', dir: here('./content') }],
  },
  routeRules: {
    // Data for the pages and the sitemap, not pages themselves.
    '/content-api/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/content-sitemap-urls': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
  },
  // Sections and articles share two routes, so their addresses come from the markdown files.
  sitemap: { sources: ['/content-sitemap-urls'] },
})
