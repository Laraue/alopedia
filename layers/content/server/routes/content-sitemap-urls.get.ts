import { defineSitemapEventHandler } from '#sitemap/server/composables/defineSitemapEventHandler'

import { useContentCatalog } from '../content/useContentCatalog'

// The sections and articles for the sitemap (see `sitemap.sources` in nuxt.config).
export default defineSitemapEventHandler(async () =>
  (await useContentCatalog()).pages().map(({ path, updatedAt }) => ({
    lastmod: updatedAt,
    loc: path,
  })),
)
