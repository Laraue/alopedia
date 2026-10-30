import type { ContentPagesDeps } from './ContentPages.deps'

export type ContentFetcher = (url: string) => Promise<unknown>

// A failed request keeps its HTTP status, so a missing page becomes the 404 page.
export class ContentRequestError extends Error {
  constructor(readonly statusCode: number) {
    super(`Content request failed with status ${statusCode}`)
  }
}

const load = async <Data>(fetcher: ContentFetcher, url: string): Promise<Data> => {
  try {
    return (await fetcher(url)) as Data
  } catch (cause) {
    throw new ContentRequestError((cause as { statusCode?: number }).statusCode ?? 500)
  }
}

// The content is read from this app's own `/content-api` routes (see `server/routes/content-api`),
// on the server while rendering and in the browser when moving between pages.
export const createContentPagesDeps = (fetcher: ContentFetcher): ContentPagesDeps => ({
  getArticle: (section, slug) =>
    load(fetcher, `/content-api/articles/${encodeURIComponent(section)}/${encodeURIComponent(slug)}`),
  getHome: () => load(fetcher, '/content-api/home'),
  getSection: (section) => load(fetcher, `/content-api/sections/${encodeURIComponent(section)}`),
})
