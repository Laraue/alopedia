import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import { situations } from '../../app/situations'
import { createContentCatalog } from './contentCatalog'
import { parseContentEntry } from './parseContentEntry'

const page = (frontmatter: string, body = 'Text'): string => `---\n${frontmatter}\n---\n${body}`
const dates = 'createdAt: 2026-10-31\nupdatedAt: 2026-10-31'
const section = (title: string, order = 0) =>
  page(`type: section\ntitle: ${title}\ndescription: ${title}\norder: ${order}\n${dates}`)
const article = (title: string, order = 0) =>
  page(`type: article\ntitle: ${title}\ndescription: ${title}\norder: ${order}\n${dates}`)

describe('parseContentEntry', () => {
  it('reads an article and its section from the path', () => {
    const entry = parseContentEntry('types/alopecia-areata.md', article('Гнездная'))

    expect(entry.section).toBe('types')
    expect(entry.slug).toBe('alopecia-areata')
    expect(entry.meta.kind).toBe('article')
  })

  it('treats index.md as the section itself', () => {
    expect(parseContentEntry('types/index.md', section('Виды')).slug).toBeUndefined()
  })

  it('rejects addresses that are not lowercase latin', () => {
    expect(() => parseContentEntry('types/Гнездная.md', article('Гнездная'))).toThrow()
  })

  it('rejects an article written as a section index', () => {
    expect(() => parseContentEntry('types/index.md', article('Виды'))).toThrow()
  })
})

describe('createContentCatalog', () => {
  const catalog = createContentCatalog({
    'treatments/index.md': section('Лечение', 2),
    'treatments/minoxidil.md': article('Миноксидил', 1),
    'types/b.md': article('Б', 2),
    'types/a.md': article('А', 1),
    'types/c.md': article('В', 3),
    'types/index.md': section('Виды', 1),
  })

  it('orders sections and their articles', () => {
    const home = catalog.home()

    expect(home.sections.map((item) => item.slug)).toEqual(['types', 'treatments'])
    expect(home.sections[0]?.articles.map((item) => item.slug)).toEqual(['a', 'b', 'c'])
  })

  it('suggests the following articles of the section first', () => {
    expect(catalog.article('types', 'b')?.related.map((item) => item.slug)).toEqual(['c', 'a'])
  })

  it('finds nothing for a missing page', () => {
    expect(catalog.article('types', 'missing')).toBeUndefined()
    expect(catalog.section('missing')).toBeUndefined()
  })

  it('lists every page for the sitemap', () => {
    expect(catalog.pages().map((item) => item.path)).toEqual([
      '/types',
      '/types/a',
      '/types/b',
      '/types/c',
      '/treatments',
      '/treatments/minoxidil',
    ])
  })

  it('fails on an article without a section', () => {
    expect(() => createContentCatalog({ 'types/a.md': article('А') })).toThrow()
  })
})

describe('the real content', () => {
  const root = fileURLToPath(new URL('../../content', import.meta.url))
  const files: Record<string, string> = {}
  const read = (folder: string): void => {
    for (const item of readdirSync(folder, { withFileTypes: true })) {
      const path = join(folder, item.name)
      if (item.isDirectory()) {
        read(path)
      } else if (item.name.endsWith('.md')) {
        files[relative(root, path)] = readFileSync(path, 'utf8')
      }
    }
  }
  read(root)

  it('parses, and its internal links point to existing pages', () => {
    const catalog = createContentCatalog(files)
    const pages = new Set(catalog.pages().map((item) => item.path))
    const links = Object.values(files).flatMap((raw) =>
      [...raw.matchAll(/\]\((\/[^)#\s]*)/g)].map((match) => match[1] ?? ''),
    )

    expect(links.filter((link) => !pages.has(link))).toEqual([])
  })

  it('has a page for every situation on the home page', () => {
    const pages = new Set(createContentCatalog(files).pages().map((item) => item.path))

    expect(situations.filter((situation) => !pages.has(situation.to))).toEqual([])
  })
})
