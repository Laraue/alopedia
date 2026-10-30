import { useStorage } from 'nitropack/runtime'

import { type ContentCatalog, createContentCatalog } from './contentCatalog'

let catalog: Promise<ContentCatalog> | undefined

// The articles (`content/`, bundled with the server as `articles` assets) are read once and kept.
export const useContentCatalog = (): Promise<ContentCatalog> => {
  catalog ??= (async () => {
    const storage = useStorage('assets:articles')
    const files: Record<string, string> = {}
    for (const key of await storage.getKeys()) {
      if (!key.endsWith('.md')) {
        continue
      }
      const raw = await storage.getItemRaw(key)
      // Storage keys look like `types:gnezdnaya.md`.
      files[key.replaceAll(':', '/')] =
        raw instanceof Uint8Array ? new TextDecoder().decode(raw) : String(raw)
    }

    return createContentCatalog(files)
  })()

  return catalog
}
