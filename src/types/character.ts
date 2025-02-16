export interface Character {
  id: string
  name: string
  features: {
    face: string
    eyes: string
    mouth: string
    nose: string
    hairStyle: string
    bodyType: string
  }
  poses: CharacterPose[]
}

export interface CharacterPose {
  id: string
  name: string
  imageUrl: string
}

export interface CharacterFeature {
  id: string
  name: string
  imageUrl: string
}
