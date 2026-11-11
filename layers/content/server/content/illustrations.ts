// Illustrations drawn for the articles. An article inserts one with a line of its own:
//
//   ::illustration[hair-cycle]
//
// The files live in public/images/illustrations/<id>/: an AVIF for browsers that support it and the
// original PNG as a fallback. To serve them from a CDN, change the base URL below.
const illustrationsBaseUrl = '/images/illustrations'

interface IllustrationFrame {
  /** The file name without an extension: `<file>.avif` and `<file>.png` must both exist. */
  file: string
  alt: string
  label: string
  note: string
}

interface Illustration {
  caption: string
  frames: IllustrationFrame[]
  height: number
  width: number
}

const illustrations: Record<string, Illustration> = {
  'hair-cycle': {
    caption:
      'Цикл роста волоса. Каждый волос проходит эти фазы по кругу, и в покое обычно находится около 10% волос.',
    frames: [
      {
        alt: 'Волосяной фолликул в разрезе кожи: глубокий, с толстым растущим волосом',
        file: '1-anagen',
        label: 'Рост',
        note: 'Анаген, несколько лет',
      },
      {
        alt: 'Фолликул сжимается и отходит от питающего его сосочка',
        file: '2-catagen',
        label: 'Переход',
        note: 'Катаген, 2–3 недели',
      },
      {
        alt: 'Короткий фолликул, волос держится у поверхности кожи и не растёт',
        file: '3-telogen',
        label: 'Покой',
        note: 'Телоген, 2–3 месяца',
      },
      {
        alt: 'Старый волос выходит из кожи, а под ним в том же фолликуле растёт новый',
        file: '4-exogen',
        label: 'Смена',
        note: 'Старый волос выпадает, новый растёт',
      },
    ],
    height: 600,
    width: 600,
  },
}

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

export const renderIllustration = (id: string): string => {
  const illustration = illustrations[id]
  if (!illustration) {
    throw new Error(`Unknown illustration "${id}"`)
  }

  const frames = illustration.frames
    .map((frame) => {
      const src = `${illustrationsBaseUrl}/${id}/${frame.file}`

      return (
        '<li class="illustration-frame">' +
        `<picture><source srcset="${src}.avif" type="image/avif">` +
        `<img src="${src}.png" alt="${escapeHtml(frame.alt)}" width="${illustration.width}" ` +
        `height="${illustration.height}" loading="lazy" decoding="async"></picture>` +
        `<span class="illustration-label">${escapeHtml(frame.label)}</span>` +
        `<span class="illustration-note">${escapeHtml(frame.note)}</span>` +
        '</li>'
      )
    })
    .join('')

  return (
    `<figure class="illustration"><ol class="illustration-frames">${frames}</ol>` +
    `<figcaption>${escapeHtml(illustration.caption)}</figcaption></figure>\n`
  )
}
