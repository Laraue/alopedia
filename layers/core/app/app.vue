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

import { NuxtLayout, NuxtPage } from '#components'
import {
  acknowledgeCookieNotice,
  isCookieNoticeAcknowledged,
} from '#layers/core/app/analytics/cookieNotice'
import CookieNotice from '#layers/core/app/analytics/components/CookieNotice.vue'
import { useYandexMetrica } from '#layers/core/app/analytics/useYandexMetrica'

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
