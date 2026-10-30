// The dates are calendar days (2026-10-31), so they are shown as they are written, in any timezone.
const formatter = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long', timeZone: 'UTC' })

export const formatDate = (date: string): string => formatter.format(new Date(date))
