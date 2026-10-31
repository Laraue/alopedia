<template>
  <section
    aria-label="Использование cookie"
    class="notice"
    role="region">
    <p class="text">
      Мы используем cookie и Яндекс Метрику, чтобы понимать, какие статьи читают, и делать сайт
      лучше. Без вашего согласия статистика не собирается. Подробнее — в
      <NuxtLink to="/privacy">политике конфиденциальности</NuxtLink>.
    </p>
    <div class="actions">
      <button
        class="decline"
        type="button"
        @click="emit('decline')">
        Отказаться
      </button>
      <button
        class="accept"
        type="button"
        @click="emit('accept')">
        Принять
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

const emit = defineEmits<{
  accept: []
  decline: []
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
  max-width: 52rem;
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

.actions {
  display: flex;
  flex-shrink: 0;
  gap: var(--space-2);
}

.accept,
.decline {
  border-radius: var(--radius-full);
  cursor: pointer;
  font-weight: var(--font-weight-semibold);
  padding: var(--space-2) var(--space-5);
}

.accept {
  background: var(--color-accent);
  border: 1px solid var(--color-accent);
  color: var(--color-on-accent);
}

.accept:hover {
  background: var(--color-accent-hover);
}

.decline {
  background: transparent;
  border: 1px solid var(--color-border-strong);
  color: var(--color-text);
}

.decline:hover {
  background: var(--color-soft);
}

@media (width <= 640px) {
  .notice {
    align-items: stretch;
    flex-direction: column;
    gap: var(--space-3);
  }

  .actions > * {
    flex: 1;
  }
}
</style>
