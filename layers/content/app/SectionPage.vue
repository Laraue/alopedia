<template>
  <div class="container page">
    <ContentBreadcrumbs
      :crumbs="[{ title: 'Главная', to: '/' }]"
      :current="page.meta.title" />
    <h1 class="title">{{ page.meta.title }}</h1>
    <p class="lead">{{ page.meta.description }}</p>
    <ContentBody
      class="intro"
      :html="page.html" />
    <div
      v-if="page.articles.length > 0"
      class="grid">
      <ArticleCard
        v-for="article in page.articles"
        :key="article.slug"
        :article="article" />
    </div>
    <p
      v-else
      class="empty">
      Статьи этого раздела готовятся.
    </p>
  </div>
</template>

<script setup lang="ts">
import { createError, useAsyncData, useHead, useSeoMeta } from '#app'
import { defineBreadcrumb, defineWebPage, useSchemaOrg } from '#imports'

import ArticleCard from './components/ArticleCard.vue'
import ContentBody from './components/ContentBody.vue'
import ContentBreadcrumbs from './components/ContentBreadcrumbs.vue'
import type { ContentPagesDeps } from './ContentPages.deps'

const props = defineProps<{
  deps: ContentPagesDeps
  section: string
}>()

const { data, error } = await useAsyncData(`content-section-${props.section}`, () =>
  props.deps.getSection(props.section),
)
if (!data.value) {
  throw createError({ fatal: true, statusCode: error.value?.statusCode ?? 500 })
}
const page = data.value
const { description, keywords, title, updatedAt } = page.meta

if (keywords.length > 0) {
  useHead({ meta: [{ content: keywords.join(', '), name: 'keywords' }] })
}
useSeoMeta({ description, ogType: 'website', title })
useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage', dateModified: updatedAt }),
  defineBreadcrumb({
    itemListElement: [
      { item: '/', name: 'Главная' },
      { item: `/${page.slug}`, name: title },
    ],
  }),
])
</script>

<style scoped>
.page {
  padding-top: var(--space-8);
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
  max-width: var(--article-max-width);
}

.intro {
  margin-top: var(--space-6);
  max-width: var(--article-max-width);
}

.grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  margin-top: var(--space-8);
}

.empty {
  color: var(--color-faint);
  margin-top: var(--space-8);
}
</style>
