<template>
  <ArticlePage
    :deps="deps"
    :section="section"
    :slug="slug" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useRoute } from '#app'
import { definePageMeta } from '#app/composables/pages'
import ArticlePage from '#layers/content/app/ArticlePage.vue'
import { useContentPagesDeps } from '#layers/content/app/useContentPagesDeps'

definePageMeta({
  key: (route) => route.path,
})

const route = useRoute()
const section = computed(() => String(route.params['section']))
const slug = computed(() => String(route.params['slug']))
const deps = useContentPagesDeps()
</script>
