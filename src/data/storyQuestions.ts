export interface StoryOption {
  id: string
  text: string
}

export interface StoryQuestion {
  id: string
  text: string
  options: StoryOption[]
}

export const storyQuestions: StoryQuestion[] = [
  {
    id: 'love',
    text: 'Uwielbiam...',
    options: [
      { id: 'hug', text: 'się do ciebie przytulać' },
      { id: 'talk', text: 'rozmawiać z tobą' },
      { id: 'play', text: 'bawić się z tobą' }
    ]
  },
  {
    id: 'favorite_activity',
    text: 'Najbardziej lubię gdy...',
    options: [
      { id: 'read', text: 'czytasz mi książki' },
      { id: 'walk', text: 'chodzimy na spacery' },
      { id: 'cook', text: 'gotujemy razem' }
    ]
  },
  // Add more questions as needed
]
