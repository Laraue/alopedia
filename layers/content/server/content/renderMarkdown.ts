import { Marked } from 'marked'

import type { ContentHeading } from '../../shared/Content.types'

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

// The text of a heading is taken from its rendered HTML, where marked has escaped it.
const decodeEntities = (value: string): string =>
  value
    .replaceAll(/&#x([\da-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replaceAll(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    // Last, so that "&amp;lt;" becomes "&lt;" and not "<".
    .replaceAll('&amp;', '&')

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replaceAll(/[^\p{L}\p{N}]+/gu, '-')
    .replaceAll(/^-+|-+$/g, '')

// The articles are our own content, so the HTML is not sanitized. Second and third level headings
// get an id (for the table of contents and links to a section) and are returned alongside the HTML.
// Links to other sites (the sources) open in a new tab and pass no ranking.
export const renderMarkdown = (body: string): { headings: ContentHeading[]; html: string } => {
  const headings: ContentHeading[] = []
  const usedIds = new Map<string, number>()

  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ depth, tokens }) {
        const content = this.parser.parseInline(tokens)
        if (depth !== 2 && depth !== 3) {
          return `<h${depth}>${content}</h${depth}>\n`
        }

        const text = decodeEntities(content.replaceAll(/<[^>]*>/g, ''))
        const base = slugify(text) || 'section'
        const count = usedIds.get(base) ?? 0
        usedIds.set(base, count + 1)
        const id = count === 0 ? base : `${base}-${count}`
        headings.push({ id, level: depth, text })

        return `<h${depth} id="${id}">${content}</h${depth}>\n`
      },
      image({ href, text, title }) {
        const titleAttribute = title ? ` title="${escapeHtml(title)}"` : ''

        return `<img src="${escapeHtml(href)}" alt="${escapeHtml(text)}"${titleAttribute} loading="lazy">`
      },
      link({ href, title, tokens }) {
        const content = this.parser.parseInline(tokens)
        const titleAttribute = title ? ` title="${escapeHtml(title)}"` : ''
        const external = /^https?:\/\//.test(href)
        const externalAttributes = external
          ? ' target="_blank" rel="noopener noreferrer nofollow"'
          : ''

        return `<a href="${escapeHtml(href)}"${titleAttribute}${externalAttributes}>${content}</a>`
      },
    },
  })

  return { headings, html: marked.parse(body, { async: false }) }
}
