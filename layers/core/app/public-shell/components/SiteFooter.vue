<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="about">
          <p class="name">{{ siteName }}</p>
          <p class="tagline">{{ siteTagline }}</p>
        </div>
        <nav
          aria-label="Разделы сайта"
          class="links">
          <NuxtLink
            v-for="link in footerNavigation"
            :key="link.to"
            :to="link.to">
            {{ link.title }}
          </NuxtLink>
        </nav>
      </div>
      <p class="disclaimer">
        Материалы сайта носят информационный характер и не являются медицинской консультацией.
        Диагноз и лечение назначает врач.
      </p>
      <p class="copyright">© {{ year }} {{ siteName }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { siteName, siteTagline } from '#layers/core/app/constants/site'
import { footerNavigation } from '#layers/core/app/public-shell/navigation'

const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--color-footer);
  color: var(--color-footer-muted);
  font-size: var(--font-size-sm);
  margin-top: var(--space-16);
  padding: var(--space-10) 0 var(--space-8);
}

.columns {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  justify-content: space-between;
}

.name {
  color: var(--color-footer-text);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.tagline {
  margin-top: var(--space-1);
  max-width: 22rem;
}

.links {
  display: grid;
  gap: var(--space-2) var(--space-8);
  grid-template-columns: repeat(2, auto);
}

.links a {
  color: var(--color-footer-text);
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.disclaimer {
  border-top: 1px solid var(--color-footer-divider);
  margin-top: var(--space-8);
  max-width: 44rem;
  padding-top: var(--space-6);
}

.copyright {
  margin-top: var(--space-3);
}
</style>
