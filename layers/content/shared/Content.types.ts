// Shared by the server's content catalog and the pages without importing app composables.

// `section` is the index page of a folder (its `index.md`), `article` an ordinary page.
export type ContentKind = 'article' | 'section'

export type ContentMeta = {
  createdAt: string
  description: string
  // Sections only: a short line for the home page's section list.
  hint?: string
  // Sections only: the icon on the home page, one of `SectionIcon`'s names.
  icon?: string
  keywords: string[]
  kind: ContentKind
  // Medical pages show the disclaimer and are marked up as MedicalWebPage.
  medical: boolean
  order: number
  title: string
  updatedAt: string
}

// One markdown file: `types/gnezdnaya.md` is the article `gnezdnaya` of the section `types`,
// `types/index.md` the section itself (its slug is undefined).
export type ContentEntry = {
  body: string
  meta: ContentMeta
  section: string
  slug?: string
}

export type ArticleSummary = {
  description: string
  section: string
  slug: string
  title: string
  updatedAt: string
}

export type SectionSummary = {
  description: string
  hint?: string
  icon?: string
  slug: string
  title: string
}

export type ContentHeading = {
  id: string
  level: 2 | 3
  text: string
}

export type SectionPage = {
  articles: ArticleSummary[]
  html: string
  meta: ContentMeta
  slug: string
}

export type ArticlePage = {
  headings: ContentHeading[]
  html: string
  meta: ContentMeta
  // Other articles of the same section, for "read also".
  related: ArticleSummary[]
  section: SectionSummary
  slug: string
}

export type HomeSection = SectionSummary & {
  articles: ArticleSummary[]
}

export type HomePage = {
  sections: HomeSection[]
}
