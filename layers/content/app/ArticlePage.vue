<template>
  <div class="container page">
    <div class="layout">
      <article class="article">
        <ContentBreadcrumbs
          :crumbs="[
            { title: 'Главная', to: '/' },
            { title: page.section.title, to: `/${page.section.slug}` },
          ]"
          :current="page.meta.title" />
        <h1 class="title">{{ page.meta.title }}</h1>
        <p class="lead">{{ page.meta.description }}</p>
        <p class="updated">Обновлено {{ formatDate(page.meta.updatedAt) }}</p>
        <MedicalDisclaimer
          v-if="page.meta.medical"
          class="disclaimer" />
        <details
          v-if="showToc"
          class="mobile-toc">
          <summary>Содержание</summary>
          <ArticleToc
            :headings="page.headings"
            :titled="false" />
        </details>
        <ContentBody
          class="body"
          :html="page.html" />
      </article>
      <aside
        v-if="showToc"
        class="sidebar">
        <ArticleToc :headings="page.headings" />
      </aside>
    </div>

    <section
      v-if="page.related.length > 0"
      class="related">
      <h2 class="related-title">Читайте также</h2>
      <div class="grid">
        <ArticleCard
          v-for="article in page.related"
          :key="article.slug"
          :article="article" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { createError, useAsyncData, useHead, useSeoMeta } from '#app'
import { defineArticle, defineBreadcrumb, defineWebPage, useSchemaOrg } from '#imports'
import MedicalDisclaimer from '#layers/core/app/ui/components/MedicalDisclaimer.vue'

import ArticleCard from './components/ArticleCard.vue'
import ArticleToc from './components/ArticleToc.vue'
import ContentBody from './components/ContentBody.vue'
import ContentBreadcrumbs from './components/ContentBreadcrumbs.vue'
import type { ContentPagesDeps } from './ContentPages.deps'
import { formatDate } from './formatDate'

const props = defineProps<{
  deps: ContentPagesDeps
  section: string
  slug: string
}>()

const { data, error } = await useAsyncData(`content-article-${props.section}-${props.slug}`, () =>
  props.deps.getArticle(props.section, props.slug),
)
if (!data.value) {
  throw createError({ fatal: true, statusCode: error.value?.statusCode ?? 500 })
}
const page = data.value

// A short article reads fine without a table of contents.
const showToc = page.headings.length >= 3

const { createdAt, description, keywords, medical, title, updatedAt } = page.meta

if (keywords.length > 0) {
  useHead({ meta: [{ content: keywords.join(', '), name: 'keywords' }] })
}
useSeoMeta({
  articleModifiedTime: updatedAt,
  articlePublishedTime: createdAt,
  description,
  ogType: 'article',
  title,
})
useSchemaOrg([
  // Medical pages are MedicalWebPage, so search engines see what the text is about.
  ...(medical ? [defineWebPage({ '@type': 'MedicalWebPage', dateModified: updatedAt })] : []),
  defineArticle({
    dateModified: updatedAt,
    datePublished: createdAt,
    headline: title,
    keywords,
  }),
  defineBreadcrumb({
    itemListElement: [
      { item: '/', name: 'Главная' },
      { item: `/${page.section.slug}`, name: page.section.title },
      { item: `/${page.section.slug}/${page.slug}`, name: title },
    ],
  }),
])
</script>

<style scoped>
.page {
  padding-top: var(--space-8);
}

/* The text keeps its reading width on the left; the table of contents goes to the container's right
   edge, so both line up with the header (logo on the left, navigation on the right). */
.layout {
  display: grid;
  gap: var(--space-12);
  grid-template-columns: minmax(0, var(--article-max-width)) 15rem;
  justify-content: space-between;
}

.article {
  min-width: 0;
}

.title {
  font-size: clamp(1.75rem, 4vw, var(--font-size-4xl));
  letter-spacing: -0.02em;
  margin-top: var(--space-4);
}

.lead {
  color: var(--color-muted);
  font-size: var(--font-size-xl);
  margin-top: var(--space-3);
}

.updated {
  color: var(--color-faint);
  font-size: var(--font-size-sm);
  margin-top: var(--space-3);
}

.disclaimer {
  margin-top: var(--space-6);
}

.body {
  margin-top: var(--space-8);
}

.sidebar {
  align-self: start;
  position: sticky;
  top: calc(var(--header-height) + var(--space-8));
}

.mobile-toc {
  display: none;
}

.related {
  border-top: 1px solid var(--color-divider);
  margin-top: var(--space-12);
  padding-top: var(--space-8);
}

.related-title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-5);
}

.grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
}

@media (width <= 960px) {
  .layout {
    display: block;
  }

  .sidebar {
    display: none;
  }

  .mobile-toc {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    display: block;
    margin-top: var(--space-6);
    padding: var(--space-3) var(--space-4);
  }

  .mobile-toc summary {
    cursor: pointer;
    font-weight: var(--font-weight-semibold);
  }

  .mobile-toc[open] summary {
    margin-bottom: var(--space-3);
  }
}
</style>
