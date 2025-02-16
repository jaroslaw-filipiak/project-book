import { defineStore } from 'pinia'
// import type { Character, CharacterFeature, CharacterPose } from '@/types/character'

interface CharacterState {
  characters: Character[]
  currentStep: number
  maxSteps: number
  currentCharacter: Character | null
  availableFeatures: {
    faces: CharacterFeature[]
    eyes: CharacterFeature[]
    mouths: CharacterFeature[]
    noses: CharacterFeature[]
    hairStyles: CharacterFeature[]
    bodyTypes: CharacterFeature[]
  }
}

export const useCharacterStore = defineStore('character', {
  state: (): CharacterState => ({
    currentStep: 1,
    maxSteps: 4,
    characters: [],
    currentCharacter: null,
    availableFeatures: {
      faces: [],
      eyes: [],
      mouths: [],
      noses: [],
      hairStyles: [],
      bodyTypes: [],
    },
  }),

  actions: {
    nextStep() {
      this.currentStep++
    },

    prevStep() {
      this.currentStep--
    },
  },
})
