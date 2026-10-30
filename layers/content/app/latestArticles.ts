import type { ArticleSummary, HomePage } from '../shared/Content.types'

// The articles of all sections, most recently updated first; same-day ones keep the sections' order.
export const latestArticles = (home: HomePage): ArticleSummary[] =>
  home.sections
    .flatMap((section) => section.articles)
    .toSorted((a, b) => b.updatedAt.localeCompare(a.updatedAt))
