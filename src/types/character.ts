export interface Character {
  id: string
  name: string
  features: {
    id: string
    name: string
    sex: 'male' | 'female'
    body?: any
    face?: any
    hair?: any
    facialHair?: any
    eyes?: any
    eyebrows?: any
    mouth?: any
    glasses?: any
    specialSigns?: any
    clothesUpper?: any
    clothesLower?: any
    shoes?: any
    isComplete: boolean
  }
}
