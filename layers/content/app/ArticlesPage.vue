<template>
  <div class="container page">
    <ContentBreadcrumbs
      :crumbs="[{ title: 'Главная', to: '/' }]"
      current="Все статьи" />
    <h1 class="title">Все статьи</h1>
    <p class="lead">Все материалы сайта, от новых к старым.</p>
    <ul class="grid">
      <li
        v-for="article in articles"
        :key="`${article.section}/${article.slug}`">
        <ArticleCard
          :article="article"
          dated
          :section-title="sectionTitles[article.section]" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { createError, useAsyncData, useSeoMeta } from '#app'
import { defineBreadcrumb, defineWebPage, useSchemaOrg } from '#imports'

import ArticleCard from './components/ArticleCard.vue'
import ContentBreadcrumbs from './components/ContentBreadcrumbs.vue'
import type { ContentPagesDeps } from './ContentPages.deps'
import { latestArticles } from './latestArticles'

const props = defineProps<{
  deps: ContentPagesDeps
}>()

// The same data as the home page: every section with its articles.
const { data, error } = await useAsyncData('content-home', () => props.deps.getHome())
if (!data.value) {
  throw createError({ fatal: true, statusCode: error.value?.statusCode ?? 500 })
}
const home = data.value

const sectionTitles = Object.fromEntries(
  home.sections.map((section) => [section.slug, section.title]),
)
const articles = latestArticles(home)

useSeoMeta({
  description:
    'Все статьи Алопедии об алопеции и выпадении волос: виды алопеции, лечение, выпадение волос у женщин и детей, жизнь с алопецией.',
  ogType: 'website',
  title: 'Все статьи',
})
useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage' }),
  defineBreadcrumb({
    itemListElement: [
      { item: '/', name: 'Главная' },
      { item: '/articles', name: 'Все статьи' },
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
}

.grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  list-style: none;
  margin-top: var(--space-8);
  padding: 0;
}
</style>
