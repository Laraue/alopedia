# Architecture

A Nuxt SSR content site without a backend: the articles are markdown files bundled with the
server. The structure follows laraue-boards (see its ARCHITECTURE.md), reduced to what a content
prototype needs.

## Layers

```text
layers/
  core/                          What every area shares.
    app/
      app.vue, error.vue         The root and the common error page.
      layouts/default.vue        Header, page, footer.
      ui/styles/                 Design tokens (light and dark) and base styles.
      ui/components/             Shared UI, e.g. the medical disclaimer.
      public-shell/              Header, footer and their navigation.
      constants/                 Site name, tagline, the privacy policy's operator and contact.
      analytics/                 Yandex Metrica and the cookie consent (notice, stored answer).
  content/                       Home, section and article pages.
    app/
      pages/                     Route integration: index, articles, [section], [section]/[slug].
      HomePage.vue, ArticlesPage.vue, SectionPage.vue, ArticlePage.vue
                                 The pages: load data through their deps, set SEO and schema.org.
      ContentPages.deps*.ts      The pages' data access, over the app's own /content-api routes.
      components/                Article card, body, table of contents, breadcrumbs.
    server/
      content/                   Frontmatter and markdown parsing, the catalog.
      routes/content-api/        JSON for the pages (noindex, disallowed in robots.txt).
      routes/content-sitemap-urls.get.ts
                                 Sections and articles for the sitemap.
    shared/                      Types shared by the server and the pages.
    content/                     The articles: <section>/index.md and <section>/<slug>.md.
  site/app/                      The site's own pages that are not content.
    pages/privacy.vue, sections/legal/
                                 The privacy policy.
server/routes/robots.txt.ts      robots.txt with the sitemap address.
```

A layer imports only itself and `#layers/core`. Pages in `app/pages` are thin: they read route
parameters, create the deps and pass them to a page component.

## URLs

- Sections are English folders: `/types`, `/women`, `/treatments`, `/life`, `/kids`, `/glossary`,
  `/about`. A section listed in `core/app/public-shell/navigation.ts` must have a folder in
  `content/content`.
- Articles are English too: `/types/alopecia-areata`, `/treatments/minoxidil`. The same path can
  then serve every language later (`/en/types/alopecia-areata`).
- No trailing slash (Nuxt's default); canonical URLs come from nuxt-seo-utils.
- Everything a visitor sees is in Russian.

## Writing an article

```markdown
---
type: article            # or `section` for a folder's index.md
title: Гнездная (очаговая) алопеция
description: One or two sentences for the search snippet and the card.
order: 1                 # position in the section
medical: true            # shows the disclaimer, marks the page as MedicalWebPage
icon: category           # sections only: home page icon (see app/components/SectionIcon.vue)
hint: Гнездная, андрогенная  # sections only: short line under the name on the home page
keywords: [гнездная алопеция, очаговая алопеция]
createdAt: 2026-10-31
updatedAt: 2026-10-31
---
```

Internal links are absolute paths (`/types/alopecia-areata`); a test checks they point to existing pages.
Links to other sites open in a new tab with `nofollow`. Every medical article ends with sources.

## SEO

- Server-rendered HTML, a title and description per page, keywords from the frontmatter.
- `@nuxtjs/sitemap` (`/sitemap.xml`) with sections and articles from the catalog.
- `nuxt-schema-org`: Organization and WebSite everywhere, CollectionPage for sections, Article (and
  MedicalWebPage for medical pages) with BreadcrumbList for articles.
- Set `NUXT_PUBLIC_SITE_URL` to the production origin; canonical, sitemap and robots.txt use it.

## Analytics

Yandex Metrica runs only in production, only with a counter id
(`runtimeConfig.public.yandexMetricaId`), and only after the visitor presses «Принять» in the cookie
notice; the answer is kept in `localStorage`. The root `app.vue` decides this after hydration, so
the server-rendered page is the same for everyone. Webvisor is off. The privacy policy at `/privacy`
describes what is collected; update `privacyPolicyDate` when its text changes.
