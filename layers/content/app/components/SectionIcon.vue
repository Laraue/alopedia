<template>
  <svg
    aria-hidden="true"
    class="icon"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="1.75"
    viewBox="0 0 24 24">
    <path
      v-for="path in paths"
      :key="path"
      :d="path" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Outline icons in the Tabler style (24px grid, round strokes), named in the sections' frontmatter
// (`icon:`). An unknown name falls back to the book.
const icons: Record<string, string[]> = {
  book: [
    'M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0',
    'M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0',
    'M3 6l0 13',
    'M12 6l0 13',
    'M21 6l0 13',
  ],
  category: [
    'M4 4h6v6h-6z',
    'M14 4h6v6h-6z',
    'M4 14h6v6h-6z',
    'M14 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0',
  ],
  female: ['M7 9a5 5 0 1 0 10 0a5 5 0 1 0 -10 0', 'M12 14v7', 'M9 18h6'],
  heart: ['M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572'],
  info: ['M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0', 'M12 9h.01', 'M11 12h1v4h1'],
  mood: [
    'M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0',
    'M9 10l.01 0',
    'M15 10l.01 0',
    'M9.5 15a3.5 3.5 0 0 0 5 0',
  ],
  pill: ['M4.5 12.5l8 -8a4.94 4.94 0 0 1 7 7l-8 8a4.94 4.94 0 0 1 -7 -7', 'M8.5 8.5l7 7'],
}

const props = defineProps<{
  name?: string
}>()

const paths = computed(() => icons[props.name ?? ''] ?? icons['book'] ?? [])
</script>

<style scoped>
.icon {
  height: 1.375rem;
  width: 1.375rem;
}
</style>
