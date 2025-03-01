export interface BookPage {
  id: string
  templateId: string
  content: {
    text: Record<string, string>
    options: string[]
    characterPose: string
  }
}
