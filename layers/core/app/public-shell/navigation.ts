export type NavigationLink = {
  title: string
  to: string
}

// The sections in the header, in reading order. Their pages and articles live in the content layer
// (`layers/content/content/<section>`); a section listed here must have a folder there.
export const mainNavigation: NavigationLink[] = [
  { title: 'Виды алопеции', to: '/types' },
  { title: 'У женщин', to: '/women' },
  { title: 'Лечение', to: '/treatments' },
  { title: 'Жизнь с алопецией', to: '/life' },
  { title: 'Дети', to: '/kids' },
]

export const footerNavigation: NavigationLink[] = [
  ...mainNavigation,
  { title: 'Словарь', to: '/glossary' },
  { title: 'О проекте', to: '/about' },
]
