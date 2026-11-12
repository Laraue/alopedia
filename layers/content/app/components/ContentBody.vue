<template>
  <!-- The HTML is rendered on the server from our own markdown (see server/content/renderMarkdown). -->
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div
    class="prose"
    @click="openInternalLink"
    v-html="html"></div>
</template>

<script setup lang="ts">
import { navigateTo } from '#app'

defineProps<{
  html: string
}>()

// Links inside the text are plain `<a>` from markdown: move between pages without a reload.
const openInternalLink = async (event: MouseEvent): Promise<void> => {
  const link = (event.target as HTMLElement).closest('a')
  const href = link?.getAttribute('href')
  if (
    !href?.startsWith('/') ||
    link?.target ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.button !== 0
  ) {
    return
  }

  event.preventDefault()
  await navigateTo(href)
}
</script>

<style scoped>
.prose {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-article);
}

.prose :deep(h2) {
  font-size: var(--font-size-2xl);
  margin: var(--space-10) 0 var(--space-3);
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
}

.prose :deep(h3) {
  font-size: var(--font-size-xl);
  margin: var(--space-8) 0 var(--space-2);
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
}

.prose :deep(p),
.prose :deep(ul),
.prose :deep(ol),
.prose :deep(table),
.prose :deep(blockquote) {
  margin: 0 0 var(--space-4);
}

.prose :deep(ul),
.prose :deep(ol) {
  padding-left: var(--space-6);
}

.prose :deep(li) {
  margin: var(--space-1) 0;
}

.prose :deep(a) {
  color: var(--color-accent-text);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

.prose :deep(a:hover) {
  color: var(--color-accent-hover);
}

.prose :deep(strong) {
  font-weight: var(--font-weight-semibold);
}

.prose :deep(blockquote) {
  background: var(--color-accent-soft);
  border-left: 3px solid var(--color-accent);
  border-radius: 0 var(--radius) var(--radius) 0;
  padding: var(--space-3) var(--space-4);
}

.prose :deep(blockquote p:last-child) {
  margin-bottom: 0;
}

.prose :deep(table) {
  border-collapse: collapse;
  display: block;
  font-size: var(--font-size-md);
  overflow-x: auto;
  width: 100%;
}

.prose :deep(th),
.prose :deep(td) {
  border-bottom: 1px solid var(--color-divider);
  padding: var(--space-2) var(--space-3);
  text-align: left;
  vertical-align: top;
}

.prose :deep(th) {
  font-weight: var(--font-weight-semibold);
}

.prose :deep(img) {
  border-radius: var(--radius-card);
  height: auto;
  margin: var(--space-6) 0;
}

/* Drawn illustrations (server/content/illustrations.ts). The drawings have a white background, so
   the card stays white in the dark theme too. */
.prose :deep(.illustration) {
  margin: var(--space-6) 0 var(--space-8);
}

.prose :deep(.illustration-frames) {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  color: #2b2925;
  display: grid;
  gap: var(--space-4) var(--space-3);
  grid-template-columns: repeat(var(--illustration-columns, 4), minmax(0, 1fr));
  list-style: none;
  margin: 0;
  padding: var(--space-4);
}

.prose :deep(.illustration-frame) {
  align-content: start;
  display: grid;
  gap: var(--space-1);
  margin: 0;
  text-align: center;
}

.prose :deep(.illustration-frame picture) {
  display: block;
}

.prose :deep(.illustration-frame img) {
  border-radius: 0;
  margin: 0 0 var(--space-1);
  width: 100%;
}

.prose :deep(.illustration-label) {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  line-height: 1.3;
}

.prose :deep(.illustration-note) {
  color: #6b665d;
  font-size: var(--font-size-sm);
  line-height: 1.35;
}

.prose :deep(.illustration figcaption) {
  color: var(--color-muted);
  font-size: var(--font-size-md);
  line-height: 1.5;
  margin-top: var(--space-3);
}

@media (max-width: 36rem) {
  .prose :deep(.illustration-frames) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.prose :deep(hr) {
  border: 0;
  border-top: 1px solid var(--color-divider);
  margin: var(--space-8) 0;
}
</style>
