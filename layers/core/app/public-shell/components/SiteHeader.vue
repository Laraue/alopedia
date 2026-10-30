<template>
  <header class="header">
    <div class="container bar">
      <NuxtLink
        class="logo"
        to="/">
        <span
          aria-hidden="true"
          class="logo-mark"></span>
        {{ siteName }}
      </NuxtLink>
      <nav
        aria-label="Разделы"
        class="nav">
        <NuxtLink
          v-for="link in mainNavigation"
          :key="link.to"
          class="nav-link"
          :to="link.to">
          {{ link.title }}
        </NuxtLink>
      </nav>
      <!-- Without JavaScript too: a native disclosure keeps the menu usable before hydration. -->
      <details
        ref="mobileMenu"
        class="mobile-menu">
        <summary class="mobile-toggle">Меню</summary>
        <nav
          aria-label="Разделы"
          class="mobile-nav"
          @click="closeMobileMenu">
          <NuxtLink
            v-for="link in mainNavigation"
            :key="link.to"
            class="mobile-link"
            :to="link.to">
            {{ link.title }}
          </NuxtLink>
        </nav>
      </details>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'

import { NuxtLink } from '#components'
import { siteName } from '#layers/core/app/constants/site'
import { mainNavigation } from '#layers/core/app/public-shell/navigation'

const mobileMenu = useTemplateRef<HTMLDetailsElement>('mobileMenu')

// A chosen link closes the menu, so the next page isn't covered by it.
const closeMobileMenu = (): void => {
  if (mobileMenu.value) {
    mobileMenu.value.open = false
  }
}
</script>

<style scoped>
.header {
  backdrop-filter: blur(8px);
  background: color-mix(in srgb, var(--color-background) 88%, transparent);
  border-bottom: 1px solid var(--color-divider);
  position: sticky;
  top: 0;
  z-index: 10;
}

.bar {
  align-items: center;
  display: flex;
  gap: var(--space-8);
  height: var(--header-height);
}

.logo {
  align-items: center;
  display: inline-flex;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  gap: var(--space-2);
  letter-spacing: -0.01em;
  text-decoration: none;
}

.logo-mark {
  background: var(--color-accent);
  border-radius: var(--radius-full);
  height: 0.875rem;
  width: 0.875rem;
}

.nav {
  display: flex;
  gap: var(--space-1);
  margin-left: auto;
}

.nav-link {
  border-radius: var(--radius-full);
  color: var(--color-muted);
  font-weight: var(--font-weight-medium);
  padding: var(--space-2) var(--space-3);
  text-decoration: none;
  transition: background var(--duration-fast);
}

.nav-link:hover {
  background: var(--color-soft);
  color: var(--color-text);
}

.nav-link.router-link-active {
  background: var(--color-accent-soft);
  color: var(--color-accent-text);
}

.mobile-menu {
  display: none;
  margin-left: auto;
}

.mobile-toggle {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  list-style: none;
  padding: var(--space-1) var(--space-4);
}

.mobile-toggle::-webkit-details-marker {
  display: none;
}

.mobile-nav {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-divider);
  display: flex;
  flex-direction: column;
  left: 0;
  padding: var(--space-2) var(--space-4) var(--space-4);
  position: absolute;
  right: 0;
  top: var(--header-height);
}

.mobile-link {
  border-bottom: 1px solid var(--color-divider);
  font-size: var(--font-size-lg);
  padding: var(--space-3) 0;
  text-decoration: none;
}

.mobile-link:last-child {
  border-bottom: 0;
}

@media (width <= 860px) {
  .nav {
    display: none;
  }

  .mobile-menu {
    display: block;
  }
}
</style>
