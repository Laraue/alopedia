import { useRequestFetch } from '#app'

import type { ContentPagesDeps } from './ContentPages.deps'
import { type ContentFetcher, createContentPagesDeps } from './ContentPages.deps.impl'

// For the routes only: pages receive their deps as a prop.
export const useContentPagesDeps = (): ContentPagesDeps =>
  // `useRequestFetch()` is typed with every route of the app, which TypeScript cannot compare with a
  // plain function type, so it is narrowed to what the content pages use.
  createContentPagesDeps(useRequestFetch() as unknown as ContentFetcher)
