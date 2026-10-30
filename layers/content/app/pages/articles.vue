<template>
  <ArticlesPage :deps="deps" />
</template>

<script setup lang="ts">
import ArticlesPage from '#layers/content/app/ArticlesPage.vue'
import { useContentPagesDeps } from '#layers/content/app/useContentPagesDeps'

const deps = useContentPagesDeps()
</script>
