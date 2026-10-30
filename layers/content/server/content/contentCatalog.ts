import type {
  ArticlePage,
  ArticleSummary,
  ContentEntry,
  HomePage,
  SectionPage,
  SectionSummary,
} from '../../shared/Content.types'
import { parseContentEntry } from './parseContentEntry'
import { renderMarkdown } from './renderMarkdown'

type Section = {
  articles: ContentEntry[]
  entry: ContentEntry
}

const byOrderThenTitle = (a: ContentEntry, b: ContentEntry): number =>
  a.meta.order - b.meta.order || a.meta.title.localeCompare(b.meta.title, 'ru')

const toArticleSummary = (entry: ContentEntry): ArticleSummary => ({
  description: entry.meta.description,
  section: entry.section,
  slug: entry.slug ?? '',
  title: entry.meta.title,
  updatedAt: entry.meta.updatedAt,
})

const toSectionSummary = (entry: ContentEntry): SectionSummary => ({
  description: entry.meta.description,
  hint: entry.meta.hint,
  icon: entry.meta.icon,
  slug: entry.section,
  title: entry.meta.title,
})

// How many other articles of the section an article suggests to read next.
const relatedCount = 3

// All the content, read from `files` (a path inside the content folder -> markdown).
export const createContentCatalog = (files: Record<string, string>) => {
  const entries = Object.entries(files).map(([file, raw]) => parseContentEntry(file, raw))

  const sections = new Map<string, Section>()
  for (const entry of entries.filter((candidate) => candidate.meta.kind === 'section')) {
    sections.set(entry.section, { articles: [], entry })
  }
  for (const entry of entries.filter((candidate) => candidate.meta.kind === 'article')) {
    const section = sections.get(entry.section)
    if (!section) {
      throw new Error(`${entry.section}/${entry.slug}.md: the section has no index.md`)
    }
    section.articles.push(entry)
  }
  for (const section of sections.values()) {
    section.articles.sort(byOrderThenTitle)
  }

  const orderedSections = [...sections.values()].toSorted((a, b) =>
    byOrderThenTitle(a.entry, b.entry),
  )

  return {
    article(sectionSlug: string, slug: string): ArticlePage | undefined {
      const section = sections.get(sectionSlug)
      const entry = section?.articles.find((article) => article.slug === slug)
      if (!section || !entry) {
        return undefined
      }

      const { headings, html } = renderMarkdown(entry.body)
      const index = section.articles.indexOf(entry)
      // The articles after this one first, then from the start of the section.
      const others = [
        ...section.articles.slice(index + 1),
        ...section.articles.slice(0, index),
      ].slice(0, relatedCount)

      return {
        headings,
        html,
        meta: entry.meta,
        related: others.map((other) => toArticleSummary(other)),
        section: toSectionSummary(section.entry),
        slug,
      }
    },

    home(): HomePage {
      return {
        sections: orderedSections.map((section) => ({
          ...toSectionSummary(section.entry),
          articles: section.articles.map((article) => toArticleSummary(article)),
        })),
      }
    },

    // Every page with its address, for the sitemap.
    pages(): { path: string; updatedAt: string }[] {
      return orderedSections.flatMap((section) => [
        { path: `/${section.entry.section}`, updatedAt: section.entry.meta.updatedAt },
        ...section.articles.map((article) => ({
          path: `/${article.section}/${article.slug}`,
          updatedAt: article.meta.updatedAt,
        })),
      ])
    },

    section(sectionSlug: string): SectionPage | undefined {
      const section = sections.get(sectionSlug)
      if (!section) {
        return undefined
      }

      return {
        articles: section.articles.map((article) => toArticleSummary(article)),
        html: renderMarkdown(section.entry.body).html,
        meta: section.entry.meta,
        slug: sectionSlug,
      }
    },
  }
}

export type ContentCatalog = ReturnType<typeof createContentCatalog>
