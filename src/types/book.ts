export interface BookPage {
  id: string
  templateId: string
  content: {
    text: Record<string, string>
    options: string[]
    characterPose: string
  }
}

export interface StoryQuestion {
  id: string
  question: string
  answers: Array<{
    id: string
    text: string
  }>
}

export interface StoryAnswer {
  questionId: string
  answerId: string
}

export interface CharacterFeature {
  id: string
  name: string
  svg: string
  forSex?: 'male' | 'female' | 'both'
}

export interface Character {
  id: string
  name: string
  sex: 'male' | 'female'
  isComplete: boolean
  face?: CharacterFeature
  eyes?: CharacterFeature
  nose?: CharacterFeature
  mouth?: CharacterFeature
  hair?: CharacterFeature
  body?: CharacterFeature
  accessories?: CharacterFeature[]
}
