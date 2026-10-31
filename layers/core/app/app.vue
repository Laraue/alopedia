<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <CookieNotice
    v-if="noticeVisible"
    @accept="acceptAnalytics"
    @decline="declineAnalytics" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { NuxtLayout, NuxtPage } from '#components'
import {
  readAnalyticsConsent,
  writeAnalyticsConsent,
} from '#layers/core/app/analytics/analyticsConsent'
import CookieNotice from '#layers/core/app/analytics/components/CookieNotice.vue'
import { useYandexMetrica } from '#layers/core/app/analytics/useYandexMetrica'

const metrica = useYandexMetrica()

// The consent lives in the browser, so the notice is decided after hydration: the server-rendered
// page is the same for everyone.
const noticeVisible = ref(false)
onMounted(() => {
  if (!metrica.enabled) {
    return
  }
  const consent = readAnalyticsConsent()
  if (consent === 'granted') {
    metrica.start()
  } else if (consent === undefined) {
    noticeVisible.value = true
  }
})

const acceptAnalytics = (): void => {
  writeAnalyticsConsent('granted')
  noticeVisible.value = false
  metrica.start()
}

const declineAnalytics = (): void => {
  writeAnalyticsConsent('denied')
  noticeVisible.value = false
}
</script>
