export interface Character {
  id: string
  name: string
  sex: 'male' | 'female'
  isComplete: boolean
  face: any | null
  body: any | null
  hair: any | null
}
