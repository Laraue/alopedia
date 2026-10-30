<template>
  <NuxtLink
    class="card"
    :to="`/${article.section}/${article.slug}`">
    <span
      v-if="sectionTitle"
      class="tag">
      {{ sectionTitle }}
    </span>
    <span class="title">{{ article.title }}</span>
    <span class="description">{{ article.description }}</span>
    <span
      v-if="dated"
      class="date">
      {{ formatDate(article.updatedAt) }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

import type { ArticleSummary } from '../../shared/Content.types'
import { formatDate } from '../formatDate'

// Lists of mixed sections pass `sectionTitle` for the tag; feeds of new articles show the date.
defineProps<{
  article: ArticleSummary
  dated?: boolean
  sectionTitle?: string
}>()
</script>

<style scoped>
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  height: 100%;
  padding: var(--space-5);
  text-decoration: none;
  transition:
    border-color var(--duration-fast),
    box-shadow var(--duration-fast);
}

.card:hover {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-card);
}

.tag {
  align-self: flex-start;
  background: var(--color-accent-soft);
  border-radius: var(--radius-full);
  color: var(--color-accent-text);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-1);
  padding: 2px var(--space-3);
}

.title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-heading);
}

.card:hover .title {
  color: var(--color-accent-text);
}

.description {
  -webkit-box-orient: vertical;
  color: var(--color-muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
}

.date {
  color: var(--color-faint);
  font-size: var(--font-size-sm);
  margin-top: auto;
  padding-top: var(--space-2);
}
</style>
