<template>
  <section
    aria-label="Использование cookie"
    class="notice"
    role="region">
    <p class="text">
      Мы используем cookie и Яндекс Метрику, чтобы понимать, какие статьи читают, и делать сайт
      лучше. Продолжая пользоваться сайтом, вы соглашаетесь с этим. Подробнее — в
      <NuxtLink to="/privacy">политике конфиденциальности</NuxtLink>.
    </p>
    <button
      class="ok"
      type="button"
      @click="emit('acknowledge')">
      Понятно
    </button>
  </section>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

const emit = defineEmits<{
  acknowledge: []
}>()
</script>

<style scoped>
.notice {
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  bottom: var(--space-4);
  box-shadow: var(--shadow-card);
  display: flex;
  gap: var(--space-6);
  left: 50%;
  max-width: 48rem;
  padding: var(--space-4) var(--space-5);
  position: fixed;
  transform: translateX(-50%);
  width: calc(100% - 2 * var(--space-4));
  z-index: 20;
}

.text {
  color: var(--color-muted);
  font-size: var(--font-size-md);
  line-height: 1.5;
}

.text a {
  color: var(--color-accent-text);
}

.ok {
  background: var(--color-accent);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-full);
  color: var(--color-on-accent);
  cursor: pointer;
  flex-shrink: 0;
  font-weight: var(--font-weight-semibold);
  padding: var(--space-2) var(--space-5);
}

.ok:hover {
  background: var(--color-accent-hover);
}

@media (width <= 640px) {
  .notice {
    align-items: stretch;
    flex-direction: column;
    gap: var(--space-3);
  }
}
</style>
