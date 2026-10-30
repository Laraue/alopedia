import { createError, defineEventHandler, getRouterParam } from 'h3'

import { isSlug } from '../../../content/isSlug'
import { useContentCatalog } from '../../../content/useContentCatalog'

// One section's page: `/content-api/sections/types`.
export default defineEventHandler(async (event) => {
  const section = getRouterParam(event, 'section')
  const page = isSlug(section) ? (await useContentCatalog()).section(section) : undefined
  if (!page) {
    throw createError({ statusCode: 404 })
  }

  return page
})
