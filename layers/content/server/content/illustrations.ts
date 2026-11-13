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
  /** Frames per row on wide screens (default 4); phones always show two. */
  columns?: number
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
  'ludwig-scale': {
    caption:
      'Шкала Людвига — стадии андрогенетической алопеции у женщин. Волосы редеют на темени вдоль пробора, а линия роста надо лбом сохраняется.',
    columns: 3,
    frames: [
      {
        alt: 'Стадия 1: вид на голову сверху, пробор чуть шире обычного',
        file: 'stage-1',
        label: 'Стадия 1',
        note: 'Пробор немного расширился',
      },
      {
        alt: 'Стадия 2: пробор заметно шире, волосы вокруг него редкие',
        file: 'stage-2',
        label: 'Стадия 2',
        note: 'Пробор заметно шире, вокруг него видна кожа',
      },
      {
        alt: 'Стадия 3: на темени волос очень мало, кожа хорошо видна, линия надо лбом на месте',
        file: 'stage-3',
        label: 'Стадия 3',
        note: 'На темени волос мало, кожа хорошо видна',
      },
    ],
    height: 500,
    width: 600,
  },
  'norwood-scale': {
    caption:
      'Шкала Норвуда — стадии андрогенетической алопеции у мужчин. Слева на каждом рисунке вид сбоку, справа — сверху.',
    columns: 2,
    frames: [
      {
        alt: 'Стадия 1: полная линия роста волос, вид сбоку и сверху',
        file: 'stage-1',
        label: 'Стадия 1',
        note: 'Линия роста волос почти не изменилась',
      },
      {
        alt: 'Стадия 2: небольшие залысины у висков',
        file: 'stage-2',
        label: 'Стадия 2',
        note: 'Небольшие залысины у висков',
      },
      {
        alt: 'Стадия 3: глубокие залысины у висков',
        file: 'stage-3',
        label: 'Стадия 3',
        note: 'Глубокие залысины',
      },
      {
        alt: 'Стадия 3 vertex: глубокие залысины и поредение на макушке',
        file: 'stage-3-vertex',
        label: 'Стадия 3 vertex',
        note: 'Залысины и поредение на макушке',
      },
      {
        alt: 'Стадия 4: залысины глубже, на макушке проплешина, между ними полоса волос',
        file: 'stage-4',
        label: 'Стадия 4',
        note: 'Проплешина на макушке, между зонами полоса волос',
      },
      {
        alt: 'Стадия 5: полоса волос между лбом и макушкой узкая и редкая',
        file: 'stage-5',
        label: 'Стадия 5',
        note: 'Полоса волос сужается и редеет',
      },
      {
        alt: 'Стадия 6: лоб и макушка слились в одну зону облысения',
        file: 'stage-6',
        label: 'Стадия 6',
        note: 'Лоб и макушка слились',
      },
      {
        alt: 'Стадия 7: волосы остались подковой по бокам и на затылке',
        file: 'stage-7',
        label: 'Стадия 7',
        note: 'Волосы только подковой по бокам и на затылке',
      },
    ],
    height: 250,
    width: 500,
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
    `<figure class="illustration"><ol class="illustration-frames" style="--illustration-columns: ${illustration.columns ?? 4}">${frames}</ol>` +
    `<figcaption>${escapeHtml(illustration.caption)}</figcaption></figure>\n`
  )
}
