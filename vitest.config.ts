import { defineConfig } from 'vitest/config'

// Unit tests of plain TypeScript (the content parser and catalog, the server's JSON logger); no Nuxt
// environment needed.
export default defineConfig({
  test: {
    include: ['layers/**/*.test.ts', 'server/**/*.test.ts'],
  },
})
