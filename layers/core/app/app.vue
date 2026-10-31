<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { NuxtLayout, NuxtPage } from '#components'
import { useYandexMetrica } from '#layers/core/app/analytics/useYandexMetrica'

useYandexMetrica()
</script>
