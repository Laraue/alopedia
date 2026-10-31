export type AnalyticsConsent = 'denied' | 'granted'

const storageKey = 'alopedia-analytics-consent'

// The visitor's answer to the cookie notice, kept in their browser only. Storage can be unavailable
// (private mode, blocked site data): then the notice simply shows again.
export const readAnalyticsConsent = (): AnalyticsConsent | undefined => {
  try {
    const value = window.localStorage.getItem(storageKey)
    return value === 'granted' || value === 'denied' ? value : undefined
  } catch {
    return undefined
  }
}

export const writeAnalyticsConsent = (consent: AnalyticsConsent): void => {
  try {
    window.localStorage.setItem(storageKey, consent)
  } catch {
    // Not remembered: the notice asks again on the next visit.
  }
}

export const clearAnalyticsConsent = (): void => {
  try {
    window.localStorage.removeItem(storageKey)
  } catch {
    // Nothing stored, nothing to clear.
  }
}
