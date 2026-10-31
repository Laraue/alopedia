import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'

// One address per page: `/types/` and `/types/alopecia-areata/` permanently redirect to the same
// path without the slash (the canonical form), keeping the query string.
export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  if (url.pathname === '/' || !url.pathname.endsWith('/')) {
    return
  }

  // Leading slashes collapse to one, so `//other.site/` can't become a redirect to another site.
  const path = url.pathname.replace(/^\/+/, '/').replace(/\/+$/, '') || '/'

  return sendRedirect(event, path + url.search, 301)
})
