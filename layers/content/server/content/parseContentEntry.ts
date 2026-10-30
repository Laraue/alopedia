import type { ContentEntry, ContentKind } from '../../shared/Content.types'
import { parseFrontmatter } from './parseFrontmatter'

const kinds: Record<string, ContentKind> = {
  article: 'article',
  section: 'section',
}

// Section folders and article slugs are English: lowercase latin words joined by "-".
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const text = (value: string | string[] | undefined, key: string, file: string): string => {
  if (typeof value !== 'string' || value === '') {
    throw new Error(`${file}: "${key}" is missing in the frontmatter`)
  }

  return value
}

// `file` is a path inside the content folder: `types/index.md` or `types/alopecia-areata.md`.
export const parseContentEntry = (file: string, raw: string): ContentEntry => {
  const segments = file.replace(/\.md$/, '').split('/')
  if (segments.length !== 2) {
    throw new Error(`${file}: content is <section>/<slug>.md, one folder deep`)
  }
  const [section = '', name = ''] = segments
  const slug = name === 'index' ? undefined : name
  if (!slugPattern.test(section) || (slug !== undefined && !slugPattern.test(slug))) {
    throw new Error(`${file}: folders and file names are lowercase latin words joined by "-"`)
  }

  const { attributes, body } = parseFrontmatter(raw)
  const kind = kinds[text(attributes['type'], 'type', file)]
  if (!kind) {
    throw new Error(`${file}: unknown type "${String(attributes['type'])}"`)
  }
  if ((kind === 'section') !== (slug === undefined)) {
    throw new Error(`${file}: a section is the folder's index.md, an article any other file`)
  }

  const order = Number(attributes['order'] ?? 0)
  const keywords = attributes['keywords']
  const hint = attributes['hint']
  const icon = attributes['icon']

  return {
    body,
    meta: {
      createdAt: text(attributes['createdAt'], 'createdAt', file),
      description: text(attributes['description'], 'description', file),
      hint: typeof hint === 'string' ? hint : undefined,
      icon: typeof icon === 'string' ? icon : undefined,
      keywords: Array.isArray(keywords) ? keywords : [],
      kind,
      medical: attributes['medical'] === 'true',
      order: Number.isNaN(order) ? 0 : order,
      title: text(attributes['title'], 'title', file),
      updatedAt: text(attributes['updatedAt'], 'updatedAt', file),
    },
    section,
    slug,
  }
}
