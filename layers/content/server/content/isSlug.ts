// Route parameters are checked before they reach the catalog: only addresses content can have.
export const isSlug = (value: unknown): value is string =>
  typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
