import { defineEventHandler, setHeader } from 'h3'

// Everything is open to crawlers except the data routes the pages read from; the sitemap address is
// built from the public origin (NUXT_PUBLIC_SITE_URL, see nuxt.config).
export default defineEventHandler((event) => {
  const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://alopedia.org').replace(/\/$/, '')
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')

  return [
    'User-agent: *',
    'Disallow: /content-api/',
    'Allow: /',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n')
})
