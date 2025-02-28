import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Character } from '@/types/character'
import { storyQuestions } from '@/data/storyQuestions'

export const useCharacterStore = defineStore('characters', () => {
  const MAX_CHARACTERS = 2
  const characters = ref<Character[]>([])
  const currentStep = ref(1)
  const currentCharacterId = ref<string | null>(null)
  const isEditing = ref(false)

  const storyAnswers = ref<Record<string, Record<string, string>>>({}) // characterId -> {step: answerId}
  const currentStoryStep = ref(1)

  const currentCharacter = computed(() =>
    characters.value.find((char) => char.id === currentCharacterId.value),
  )

  function setStoryAnswer(characterId: string, step: number, answerId: string) {
    if (!storyAnswers.value[characterId]) {
      storyAnswers.value[characterId] = {}
    }
    storyAnswers.value[characterId][step.toString()] = answerId
  }

  function getCurrentStoryAnswer(characterId: string, step: number): string {
    return storyAnswers.value[characterId]?.[step.toString()] || ''
  }

  function isCharacterStoryComplete(characterId: string): boolean {
    const answers = storyAnswers.value[characterId] || {}
    return Object.keys(answers).length === storyQuestions.length
  }

  function areAllStoriesComplete(): boolean {
    return characters.value.every((char) => isCharacterStoryComplete(char.id))
  }

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
    MAX_CHARACTERS,
    characters,
    currentStep,
    currentCharacterId,
    currentCharacter,
    currentStoryStep,
    isEditing,
    createCharacter,
    updateCharacter,
    startEditing,
    nextStep,
    previousStep,
    resetCreation,
    setStoryAnswer,
    getCurrentStoryAnswer,
    isCharacterStoryComplete,
    areAllStoriesComplete,
    storyAnswers,
  }
})
