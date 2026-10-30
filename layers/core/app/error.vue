<template>
  <NuxtLayout>
    <section class="container error">
      <p class="code">{{ error.statusCode }}</p>
      <h1 class="title">{{ notFound ? 'Страница не найдена' : 'Что-то пошло не так' }}</h1>
      <p class="text">
        {{
          notFound
            ? 'Возможно, страница переехала или адрес набран с ошибкой.'
            : 'Попробуйте обновить страницу чуть позже.'
        }}
      </p>
      <button
        class="home"
        type="button"
        @click="goHome">
        На главную
      </button>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { clearError, type NuxtError, useSeoMeta } from '#app'
import { NuxtLayout } from '#components'

const props = defineProps<{
  error: NuxtError
}>()

const notFound = computed(() => props.error.statusCode === 404)

useSeoMeta({ robots: 'noindex', title: () => (notFound.value ? 'Страница не найдена' : 'Ошибка') })

const goHome = (): Promise<void> => clearError({ redirect: '/' })
</script>

<style scoped>
.error {
  padding-bottom: var(--space-16);
  padding-top: var(--space-16);
}

.code {
  color: var(--color-accent-text);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.title {
  font-size: var(--font-size-3xl);
  margin-top: var(--space-2);
}

.text {
  color: var(--color-muted);
  margin-top: var(--space-3);
}

.home {
  background: var(--color-accent);
  border: 0;
  border-radius: var(--radius-full);
  color: var(--color-on-accent);
  cursor: pointer;
  font-weight: var(--font-weight-semibold);
  margin-top: var(--space-6);
  padding: var(--space-3) var(--space-6);
}

.home:hover {
  background: var(--color-accent-hover);
}
</style>
