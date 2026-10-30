<template>
  <nav
    aria-label="Навигационная цепочка"
    class="breadcrumbs">
    <span
      v-for="crumb in crumbs"
      :key="crumb.to"
      class="crumb">
      <NuxtLink :to="crumb.to">{{ crumb.title }}</NuxtLink>
      <span aria-hidden="true">›</span>
    </span>
    <span
      aria-current="page"
      class="current">
      {{ current }}
    </span>
  </nav>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

// The pages above the current one as links, then the current page itself as plain text.
defineProps<{
  crumbs: { title: string; to: string }[]
  current: string
}>()
</script>

<style scoped>
.breadcrumbs {
  color: var(--color-muted);
  display: flex;
  flex-wrap: wrap;
  font-size: var(--font-size-sm);
  gap: var(--space-1) var(--space-2);
  min-width: 0;
}

/* A separator stays on the line of the crumb it follows, so a wrapped line never starts with it. */
.crumb {
  display: inline-flex;
  gap: var(--space-2);
}

.breadcrumbs a {
  text-decoration: none;
}

.breadcrumbs a:hover {
  color: var(--color-accent-text);
}

/* A long article title stays on one line instead of pushing the trail onto several. */
.current {
  color: var(--color-faint);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
