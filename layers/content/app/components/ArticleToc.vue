<template>
  <nav
    aria-label="Содержание"
    class="toc">
    <p
      v-if="titled"
      aria-hidden="true"
      class="toc-title">
      Содержание
    </p>
    <ol class="toc-list">
      <li
        v-for="heading in headings"
        :key="heading.id"
        :class="{ nested: heading.level === 3 }">
        <a :href="`#${heading.id}`">{{ heading.text }}</a>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { ContentHeading } from '../../shared/Content.types'

// `titled` is off where the surrounding disclosure already says "Содержание".
withDefaults(
  defineProps<{
    headings: ContentHeading[]
    titled?: boolean
  }>(),
  { titled: true },
)
</script>

<style scoped>
.toc {
  font-size: var(--font-size-md);
}

.toc-title {
  color: var(--color-faint);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.04em;
  margin-bottom: var(--space-3);
  text-transform: uppercase;
}

.toc-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  list-style: none;
  padding: 0;
}

.toc-list a {
  color: var(--color-muted);
  text-decoration: none;
}

.toc-list a:hover {
  color: var(--color-accent-text);
}

.nested {
  padding-left: var(--space-4);
}
</style>
