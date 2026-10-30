<template>
  <div class="shell">
    <SiteHeader />
    <main class="main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteFooter from '#layers/core/app/public-shell/components/SiteFooter.vue'
import SiteHeader from '#layers/core/app/public-shell/components/SiteHeader.vue'
</script>

<style scoped>
.shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}
</style>
