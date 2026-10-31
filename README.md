# Алопедия (alopedia.org)

Prototype of a Russian-language content site about alopecia (Boards: ALO-12). Nuxt SSR, no
backend: articles are markdown files in `layers/content/content`. See ARCHITECTURE.md.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # content parser, catalog and internal links
pnpm typecheck
pnpm build        # production build in .output
```

Canonical URLs, the sitemap and robots.txt use `https://alopedia.org`; override it with
`NUXT_PUBLIC_SITE_URL` (e.g. for a staging host).

## Deploy

Every push to `main` runs `.github/workflows/build-and-publish.yml`: typecheck, tests and build,
then the deploy job uploads `.output` to `/home/laraue/alopedia` and rebuilds the `alopedia`
service of Laraue.Apps.Infra (port 5019, behind nginx on alopedia.org). The same scheme as
laraue-boards.

- The deploy job runs only when the repository **variable** `DEPLOY_ENABLED` is `true` (a secret
  or an environment variable is not visible to the job's `if`).
- `SSH_*` and `TELEGRAM_*` are organization secrets. On GitHub Free they reach public repositories
  only, which is why this repository is public.
- nginx and the TLS certificate (`/etc/letsencrypt/live/alopedia.org`, renewed by certbot) live in
  Laraue.Apps.Infra; nginx picks up config changes only when its image is rebuilt.
