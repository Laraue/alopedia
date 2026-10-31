<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <CookieNotice
    v-if="noticeVisible"
    @acknowledge="closeNotice" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useSeoMeta } from '#app'
import { NuxtLayout, NuxtPage } from '#components'
import {
  acknowledgeCookieNotice,
  isCookieNoticeAcknowledged,
} from '#layers/core/app/analytics/cookieNotice'
import CookieNotice from '#layers/core/app/analytics/components/CookieNotice.vue'
import { useYandexMetrica } from '#layers/core/app/analytics/useYandexMetrica'

// Defaults for every page's link preview in messengers and social networks; pages set their own
// title and description.
useSeoMeta({
  ogImage: {
    alt: 'Алопедия — алопеция: понятно о видах, лечении и жизни без волос',
    height: 630,
    type: 'image/png',
    url: '/og-image.png',
    width: 1200,
  },
  ogLocale: 'ru_RU',
  twitterCard: 'summary_large_image',
})

const metrica = useYandexMetrica()

// Metrica starts on every visit; the notice tells the visitor about it once. Both are decided after
// hydration: the notice depends on the browser's storage, and the server-rendered page is the same
// for everyone.
const noticeVisible = ref(false)
onMounted(() => {
  if (!metrica.enabled) {
    return
  }
  metrica.start()
  noticeVisible.value = !isCookieNoticeAcknowledged()
})

const closeNotice = (): void => {
  acknowledgeCookieNotice()
  noticeVisible.value = false
}
</script>
