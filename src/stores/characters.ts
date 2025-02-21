import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Character {
  id: string
  name: string
  sex: 'male' | 'female'
  body?: any
  face?: any
  hair?: any
  isComplete: boolean
}

export const useCharacterStore = defineStore('characters', () => {
  const characters = ref<Character[]>([])
  const currentStep = ref(1)
  const currentCharacterId = ref<string | null>(null)
  const isEditing = ref(false)

  const currentCharacter = computed(() =>
    characters.value.find((char) => char.id === currentCharacterId.value),
  )

  const createCharacter = (name: string, sex: 'male' | 'female') => {
    const newCharacter: Character = {
      id: Date.now().toString(),
      name,
      sex,
      isComplete: false,
    }
    characters.value.push(newCharacter)
    currentCharacterId.value = newCharacter.id
    currentStep.value = 2
    isEditing.value = false
  }

  const startEditing = (characterId: string) => {
    currentCharacterId.value = characterId
    currentStep.value = 1
    isEditing.value = true
  }

  const updateCharacter = (characterId: string, updates: Partial<Character>) => {
    const index = characters.value.findIndex((char) => char.id === characterId)
    if (index !== -1) {
      characters.value[index] = { ...characters.value[index], ...updates }
    }
  }

  const nextStep = () => {
    if (currentStep.value < 4) {
      currentStep.value++
    }
  }

  const previousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  const resetCreation = () => {
    currentStep.value = 1
    currentCharacterId.value = null
    isEditing.value = false
  }

  return {
    characters,
    currentStep,
    currentCharacterId,
    currentCharacter,
    isEditing,
    createCharacter,
    updateCharacter,
    startEditing,
    nextStep,
    previousStep,
    resetCreation,
  }
})
