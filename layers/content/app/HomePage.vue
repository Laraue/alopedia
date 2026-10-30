<template>
  <div class="home">
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-text">
          <p class="eyebrow">{{ siteName }}</p>
          <h1 class="hero-title">Алопеция: понятно о видах, лечении и жизни без волос</h1>
          <p class="hero-lead">
            Проверенная информация и опыт людей, которые через это прошли. Без рекламы клиник и
            обещаний чудесного излечения.
          </p>
        </div>

        <!-- One panel, not separate buttons: the situations read as the hero's way in. -->
        <nav
          aria-labelledby="situations-title"
          class="situations">
          <h2
            id="situations-title"
            class="situations-title">
            Что происходит с вашими волосами?
          </h2>
          <ul class="situation-list">
            <li
              v-for="situation in situations"
              :key="situation.title">
              <NuxtLink
                class="situation"
                :to="situation.to">
                <span>{{ situation.title }}</span>
                <span
                  aria-hidden="true"
                  class="arrow">
                  →
                </span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </section>

    <div class="container">
      <section
        aria-labelledby="sections-title"
        class="block">
        <div class="block-head">
          <h2
            id="sections-title"
            class="block-title">
            Разделы
          </h2>
        </div>
        <ul class="section-list">
          <li
            v-for="section in home.sections"
            :key="section.slug">
            <NuxtLink
              class="section"
              :to="`/${section.slug}`">
              <span class="section-icon">
                <SectionIcon :name="section.icon" />
              </span>
              <span class="section-text">
                <span class="section-name">{{ section.title }}</span>
                <span class="section-hint">{{ section.hint ?? section.description }}</span>
              </span>
              <span
                v-if="section.articles.length > 0"
                class="section-count">
                {{ articleCount(section.articles.length) }}
              </span>
            </NuxtLink>
          </li>
        </ul>
      </section>

    </div>

    <!-- A full-width band of its own, so the feed reads as a separate zone of the page. -->
    <section
      v-if="latest.length > 0"
      aria-labelledby="latest-title"
      class="band">
      <div class="container">
        <div class="block-head">
          <h2
            id="latest-title"
            class="block-title">
            Новые статьи
          </h2>
          <NuxtLink
            class="block-link"
            to="/articles">
            Все статьи →
          </NuxtLink>
        </div>
        <ul class="latest-list">
          <li
            v-for="article in latest"
            :key="`${article.section}/${article.slug}`">
            <ArticleCard
              :article="article"
              dated
              :section-title="sectionTitles[article.section]" />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { createError, useAsyncData, useSeoMeta } from '#app'
import { NuxtLink } from '#components'
import { siteName, siteTagline } from '#layers/core/app/constants/site'

import ArticleCard from './components/ArticleCard.vue'
import SectionIcon from './components/SectionIcon.vue'
import type { ContentPagesDeps } from './ContentPages.deps'
import { latestArticles } from './latestArticles'
import { situations } from './situations'

const props = defineProps<{
  deps: ContentPagesDeps
}>()

const latestCount = 6

const { data, error } = await useAsyncData('content-home', () => props.deps.getHome())
if (!data.value) {
  throw createError({ fatal: true, statusCode: error.value?.statusCode ?? 500 })
}
const home = data.value

const sectionTitles = Object.fromEntries(
  home.sections.map((section) => [section.slug, section.title]),
)

const latest = latestArticles(home).slice(0, latestCount)

const pluralRules = new Intl.PluralRules('ru-RU')
const articleWords: Record<string, string> = { few: 'статьи', many: 'статей', one: 'статья' }
const articleCount = (count: number): string =>
  `${count} ${articleWords[pluralRules.select(count)] ?? 'статьи'}`

useSeoMeta({
  description: `${siteTagline}: виды алопеции, лечение, выпадение волос у женщин, жизнь с алопецией.`,
  ogType: 'website',
  title: 'Алопеция и выпадение волос: виды, лечение, опыт',
})
</script>

<style scoped>
.hero {
  background: var(--color-hero);
  padding: var(--space-16) 0;
}

.eyebrow {
  color: var(--color-accent-text);
  font-weight: var(--font-weight-semibold);
}

/* Both columns start on the same line: the panel is taller than the text, so centering them would
   push the panel above the text. */
.hero-inner {
  align-items: start;
  display: grid;
  gap: var(--space-12);
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
}

.hero-title {
  font-size: clamp(2rem, 4.2vw, var(--font-size-4xl));
  letter-spacing: -0.02em;
  margin-top: var(--space-3);
}

.hero-lead {
  color: var(--color-muted);
  font-size: var(--font-size-xl);
  margin-top: var(--space-4);
}

.situations {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  padding: var(--space-5) var(--space-6) var(--space-2);
}

.situations-title {
  font-size: var(--font-size-lg);
}

.situation-list {
  list-style: none;
  margin-top: var(--space-2);
  padding: 0;
}

.situation-list li + li {
  border-top: 1px solid var(--color-divider);
}

.situation {
  align-items: center;
  display: flex;
  font-weight: var(--font-weight-medium);
  gap: var(--space-4);
  justify-content: space-between;
  line-height: 1.35;
  padding: var(--space-3) 0;
  text-decoration: none;
}

.situation:hover {
  color: var(--color-accent-text);
}

.arrow {
  color: var(--color-accent-text);
  flex-shrink: 0;
  transition: transform var(--duration-fast);
}

.situation:hover .arrow {
  transform: translateX(3px);
}

.block {
  padding: var(--space-16) 0;
}

/* A block's header row: its title, and on the right a link to everything it shows a part of. */
.block-head {
  align-items: baseline;
  display: flex;
  gap: var(--space-4);
  justify-content: space-between;
  margin-bottom: var(--space-8);
}

.block-title {
  font-size: var(--font-size-3xl);
  letter-spacing: -0.01em;
}

.block-link {
  color: var(--color-accent-text);
  flex-shrink: 0;
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
}

.block-link:hover {
  color: var(--color-accent-hover);
}

/* The page ends with the band, and the footer follows right after it: the footer's gap above it is
   taken back, so no strip of the page shows between two zones. */
.home {
  margin-bottom: calc(-1 * var(--space-16));
}

.band {
  background: var(--color-band);
  border-top: 1px solid var(--color-divider);
  padding: var(--space-16) 0;
}

/* Sections: quiet rows with an icon and a hint, two columns on wide screens. */
.section-list {
  column-gap: var(--space-10);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  list-style: none;
  padding: 0;
}

.section-list li {
  border-bottom: 1px solid var(--color-divider);
}

.section {
  align-items: center;
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4) 0;
  text-decoration: none;
}

.section-icon {
  align-items: center;
  background: var(--color-accent-soft);
  border-radius: var(--radius);
  color: var(--color-accent-text);
  display: inline-flex;
  flex-shrink: 0;
  height: 2.5rem;
  justify-content: center;
  width: 2.5rem;
}

.section-text {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.section-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.section:hover .section-name {
  color: var(--color-accent-text);
}

.section-hint {
  color: var(--color-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.section-count {
  color: var(--color-faint);
  flex-shrink: 0;
  font-size: var(--font-size-sm);
}

.latest-list {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  list-style: none;
  padding: 0;
}

@media (width <= 960px) {
  .hero-inner {
    gap: var(--space-8);
    grid-template-columns: minmax(0, 1fr);
  }

  .hero-text {
    max-width: 44rem;
  }

  .latest-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width <= 860px) {
  .section-list {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (width <= 640px) {
  .hero {
    padding: var(--space-8) 0;
  }

  .situations {
    padding: var(--space-4) var(--space-4) var(--space-1);
  }

  .latest-list {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
