import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Character, CharacterFeature } from '@/types/book'

export const useCharacterStore = defineStore('characters', () => {
  const MAX_CHARACTERS = 1
  const characters = ref<Character[]>([])
  const currentStep = ref(1) // 1: Basic Info, 2: Head, 3: Face, 4: Facial Hair, 5: Body, 6: Accessories
  const currentCharacterId = ref<string | null>(null)
  const isEditing = ref(false)

  const currentCharacter = computed(() =>
    characters.value.find((char) => char.id === currentCharacterId.value),
  )

  // Check if all characters are created and complete
  const areAllCharactersComplete = computed(
    () =>
      characters.value.length === MAX_CHARACTERS &&
      characters.value.every((char) => char.isComplete),
  )

  // Create a new character with basic info
  const createCharacter = (name: string, sex: 'male' | 'female') => {
    const newCharacter: Character = {
      id: crypto.randomUUID ? crypto.randomUUID() : `char_${Date.now()}`,
      name,
      sex,
      isComplete: false,
    }
    characters.value.push(newCharacter)
    currentCharacterId.value = newCharacter.id
    currentStep.value = 2 // Move to Head Editor after creating character
    isEditing.value = false
  }

  // Start editing an existing character
  const startEditing = (characterId: string) => {
    currentCharacterId.value = characterId
    currentStep.value = 1
    isEditing.value = true
  }

  // Update character properties
  const updateCharacter = (characterId: string, updates: Partial<Character>) => {
    console.log('updateCharacter', characterId, updates)
    console.log('updateCharacterID', characterId)
    console.log('updateCharacterUPDATES', updates)

    const index = characters.value.findIndex((char) => char.id === characterId)
    if (index !== -1) {
      characters.value[index] = { ...characters.value[index], ...updates }
    }
  }

  // Update specific character feature
  const updateCharacterFeature = (
    featureType:
      | 'head'
      | 'face'
      | 'facialHair'
      | 'body'
      | 'accessories'
      | 'eyes'
      | 'nose'
      | 'mouth'
      | 'hair',
    featureData: CharacterFeature | CharacterFeature[] | null,
  ) => {
    if (currentCharacterId.value) {
      updateCharacter(currentCharacterId.value, {
        [featureType]: featureData,
      })
    }
  }

  // Check if current character has completed all required steps
  const isCurrentCharacterComplete = computed(() => {
    const char = currentCharacter.value
    // Minimum requirements: head and face
    return char && char.head && char.face && char.body
  })

  // Set character as complete
  const completeCharacter = () => {
    if (currentCharacterId.value && isCurrentCharacterComplete.value) {
      updateCharacter(currentCharacterId.value, {
        isComplete: true,
      })
      resetCreation()
    }
  }

  // Move to next step
  const nextStep = () => {
    if (currentStep.value < 6) {
      currentStep.value++
    }
  }

  // Move to previous step
  const previousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  // Reset the character creation process
  const resetCreation = () => {
    currentStep.value = 1
    currentCharacterId.value = null
    isEditing.value = false
  }

  // Remove a character
  const removeCharacter = (characterId: string) => {
    characters.value = characters.value.filter((char) => char.id !== characterId)
    if (currentCharacterId.value === characterId) {
      resetCreation()
    }
  }

  // Check if can create more characters
  const canCreateMoreCharacters = computed(() => characters.value.length < MAX_CHARACTERS)

  return {
    MAX_CHARACTERS,
    characters,
    currentStep,
    currentCharacterId,
    currentCharacter,
    isEditing,
    areAllCharactersComplete,
    canCreateMoreCharacters,
    createCharacter,
    updateCharacter,
    updateCharacterFeature,
    startEditing,
    nextStep,
    previousStep,
    resetCreation,
    completeCharacter,
    removeCharacter,
    isCurrentCharacterComplete,
  }
})
