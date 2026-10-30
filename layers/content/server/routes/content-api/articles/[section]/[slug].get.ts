import { createError, defineEventHandler, getRouterParam } from 'h3'

import { isSlug } from '../../../../content/isSlug'
import { useContentCatalog } from '../../../../content/useContentCatalog'

// One article's page: `/content-api/articles/types/gnezdnaya`.
export default defineEventHandler(async (event) => {
  const section = getRouterParam(event, 'section')
  const slug = getRouterParam(event, 'slug')
  const page =
    isSlug(section) && isSlug(slug)
      ? (await useContentCatalog()).article(section, slug)
      : undefined
  if (!page) {
    throw createError({ statusCode: 404 })
  }

  return page
})
