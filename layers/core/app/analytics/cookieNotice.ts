const storageKey = 'alopedia-cookie-notice'

// Whether the visitor has closed the cookie notice, kept in their browser only. Storage can be
// unavailable (private mode, blocked site data): then the notice simply shows again.
export const isCookieNoticeAcknowledged = (): boolean => {
  try {
    return window.localStorage.getItem(storageKey) === 'acknowledged'
  } catch {
    return false
  }
}

export const acknowledgeCookieNotice = (): void => {
  try {
    window.localStorage.setItem(storageKey, 'acknowledged')
  } catch {
    // Not remembered: the notice shows again on the next visit.
  }
}
