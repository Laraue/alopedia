import { useRouter, useRuntimeConfig } from '#app'

type Ym = ((id: number, method: string, ...args: unknown[]) => void) & {
  a?: unknown[][]
  l?: number
}

declare global {
  interface Window {
    ym?: Ym
  }
}

export type YandexMetrica = {
  // A counter is configured and this is not development: the cookie notice is needed.
  enabled: boolean
  // Loads the counter; called only after the visitor accepted analytics.
  start: () => void
}

// Yandex Metrica, created by the root app. Off in development and until a counter id is set
// (runtimeConfig.public.yandexMetricaId / NUXT_PUBLIC_YANDEX_METRICA_ID). Nothing is loaded until
// `start`: the counter sets cookies, so it waits for the visitor's consent. Webvisor stays off: on a
// health site session recordings would capture what people read about their condition.
export const useYandexMetrica = (): YandexMetrica => {
  // Nuxt parses a numeric env value into a number, so read it with String(...).
  const id = Number(String(useRuntimeConfig().public.yandexMetricaId))
  const enabled = !import.meta.dev && Number.isInteger(id) && id > 0
  const router = useRouter()
  let started = false

  const start = (): void => {
    if (!enabled || started || !import.meta.client) {
      return
    }
    started = true

    // The counter's loader, as on Metrica's settings page: calls queue up until tag.js arrives.
    const queue: unknown[][] = []
    const ym: Ym = (...args) => {
      queue.push(args)
    }
    ym.a = queue
    ym.l = Date.now()
    window.ym = window.ym ?? ym
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://mc.yandex.ru/metrika/tag.js'
    document.head.append(script)
    window.ym(id, 'init', {
      accurateTrackBounce: true,
      clickmap: true,
      trackLinks: true,
      webvisor: false,
    })

    // `init` counts the current page; later moves between pages without a reload are hits.
    router.afterEach((to, from) => {
      if (to.fullPath === from.fullPath) {
        return
      }
      window.ym?.(id, 'hit', new URL(to.fullPath, window.location.origin).href, {
        referer: new URL(from.fullPath, window.location.origin).href,
        title: document.title,
      })
    })
  }

  return { enabled, start }
}
