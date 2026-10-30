<template>
  <HomePage :deps="deps" />
</template>

<script setup lang="ts">
import HomePage from '#layers/content/app/HomePage.vue'
import { useContentPagesDeps } from '#layers/content/app/useContentPagesDeps'

const deps = useContentPagesDeps()
</script>
