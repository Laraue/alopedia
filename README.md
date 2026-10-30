# Алопедия (working name)

Prototype of a Russian-language content site about alopecia (Boards: ALO-12). Nuxt SSR, no
backend: articles are markdown files in `layers/content/content`. See ARCHITECTURE.md.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # content parser, catalog and internal links
pnpm typecheck
pnpm build        # production build in .output
```

Production: set `NUXT_PUBLIC_SITE_URL` (e.g. `https://alopedia.org`) for canonical URLs, the sitemap
and robots.txt.
