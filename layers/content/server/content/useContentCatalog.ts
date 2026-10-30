import { useStorage } from 'nitropack/runtime'

import { type ContentCatalog, createContentCatalog } from './contentCatalog'

let catalog: Promise<ContentCatalog> | undefined

// The articles (`content/`, bundled with the server as `articles` assets) are read once and kept.
// In development they are read on every request, so a new or edited article shows up without a
// restart.
export const useContentCatalog = (): Promise<ContentCatalog> => {
  if (import.meta.dev) {
    catalog = undefined
  }
  catalog ??= (async () => {
    const storage = useStorage('assets:articles')
    const files: Record<string, string> = {}
    for (const key of await storage.getKeys()) {
      if (!key.endsWith('.md')) {
        continue
      }
      const raw = await storage.getItemRaw(key)
      // Storage keys look like `types:alopecia-areata.md`.
      files[key.replaceAll(':', '/')] =
        raw instanceof Uint8Array ? new TextDecoder().decode(raw) : String(raw)
    }

    return createContentCatalog(files)
  })()

  return catalog
}
