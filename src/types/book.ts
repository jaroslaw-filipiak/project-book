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
