import { defineEventHandler } from 'h3'

import { useContentCatalog } from '../../content/useContentCatalog'

// The home page's data: every section with its articles.
export default defineEventHandler(async () => (await useContentCatalog()).home())
