import { useHead, useRouter, useRuntimeConfig } from '#app'

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void
  }
}

// The counter's own loader (from the Metrica settings page). Webvisor stays off: on a health site
// session recordings would capture what people read about their condition.
const loader = (id: number): string =>
  '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};' +
  'm[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}' +
  'k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})' +
  '(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");' +
  `ym(${id},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`

// Yandex Metrica, started by the root app. Off in development and until a counter id is set
// (runtimeConfig.public.yandexMetricaId / NUXT_PUBLIC_YANDEX_METRICA_ID). The loader counts the
// first page; moves between pages without a reload are sent as hits.
export const useYandexMetrica = (): void => {
  // Nuxt parses a numeric env value into a number, so read it with String(...).
  const id = Number(String(useRuntimeConfig().public.yandexMetricaId))
  if (import.meta.dev || !Number.isInteger(id) || id <= 0) {
    return
  }

  useHead({ script: [{ innerHTML: loader(id), key: 'yandex-metrica' }] })

  if (import.meta.client) {
    useRouter().afterEach((to, from) => {
      // The very first navigation (from the router's start location) is the page the loader counted.
      if (from.matched.length === 0 || to.fullPath === from.fullPath) {
        return
      }
      window.ym?.(id, 'hit', new URL(to.fullPath, window.location.origin).href, {
        referer: new URL(from.fullPath, window.location.origin).href,
        title: document.title,
      })
    })
  }
}
