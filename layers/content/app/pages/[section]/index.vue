<template>
  <SectionPage
    :deps="deps"
    :section="section" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useRoute } from '#app'
import { definePageMeta } from '#app/composables/pages'
import SectionPage from '#layers/content/app/SectionPage.vue'
import { useContentPagesDeps } from '#layers/content/app/useContentPagesDeps'

definePageMeta({
  key: (route) => route.path,
})

const route = useRoute()
const section = computed(() => String(route.params['section']))
const deps = useContentPagesDeps()
</script>
