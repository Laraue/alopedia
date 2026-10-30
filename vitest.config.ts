import { defineConfig } from 'vitest/config'

// Unit tests of plain TypeScript (the content parser and catalog); no Nuxt environment needed.
export default defineConfig({
  test: {
    include: ['layers/**/*.test.ts'],
  },
})
