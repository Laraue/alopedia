export type Situation = {
  // What the visitor sees happening, in their own words.
  title: string
  // Where the answer is: an article or a section (a test checks the page exists).
  to: string
}

// The home page starts from what is happening, not from a diagnosis: people search for symptoms.
export const situations: Situation[] = [
  { title: 'Появились круглые очаги без волос', to: '/types/gnezdnaya' },
  { title: 'Редеют волосы на макушке или у висков', to: '/types/androgennaya' },
  { title: 'Волосы сыпятся после родов, болезни или стресса', to: '/types/telogenovoe-vypadenie' },
  { title: 'Выпали все волосы на голове', to: '/types/totalnaya' },
  { title: 'Алопеция у ребёнка', to: '/kids' },
  { title: 'Ищу парик или систему волос', to: '/life/pariki' },
]
