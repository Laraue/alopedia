import type { ArticlePage, HomePage, SectionPage } from '../shared/Content.types'

export type ContentPagesDeps = {
  getArticle: (section: string, slug: string) => Promise<ArticlePage>
  getHome: () => Promise<HomePage>
  getSection: (section: string) => Promise<SectionPage>
}
