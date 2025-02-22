import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Character } from '@/types/character'
import type { BookPage } from '@/types/book'

export const useBookStore = defineStore('book', () => {
  const MAX_CHARACTERS = 2
  const pages = ref<BookPage[]>([])
  const characters = ref<Character[]>([])
  const currentStep = ref(1)
  const maxPages = 12
  const saving = ref(false)

  const isComplete = computed(() => pages.value.length === maxPages && characters.value.length > 0)

  function addCharacter(character: Character) {
    if (characters.value.length < MAX_CHARACTERS) {
      characters.value.push(character)
    }
  }

  function removeCharacter(characterId: string) {
    characters.value = characters.value.filter((char) => char.id !== characterId)
  }

  function updatePage(index: number, pageData: Partial<BookPage>) {
    if (index >= 0 && index < pages.value.length) {
      pages.value[index] = { ...pages.value[index], ...pageData }
    } else {
      pages.value.push(pageData as BookPage)
    }
  }

  function getTemplateComponent(templateId: string) {
    // TODO: Implement dynamic template loading
    return null
  }

  function getCharacterSvg(characterId: string, pose: string): string {
    // TODO: Implement character SVG composition
    return ''
  }

  function getCharacterBodySvg(body: any): string {
    // TODO: Implement body SVG rendering
    return ''
  }

  function getCharacterFaceSvg(face: any): string {
    // TODO: Implement face SVG rendering
    return ''
  }

  function getCharacterHairSvg(hair: any): string {
    // TODO: Implement hair SVG rendering
    return ''
  }

  async function finalizeBook() {
    saving.value = true
    try {
      // TODO: Implement book finalization and saving
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } finally {
      saving.value = false
    }
  }

  function nextStep() {
    if (currentStep.value < 3) {
      currentStep.value++
    }
  }

  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  return {
    MAX_CHARACTERS,
    pages,
    characters,
    currentStep,
    maxPages,
    saving,
    isComplete,
    addCharacter,
    updatePage,
    getTemplateComponent,
    getCharacterSvg,
    getCharacterBodySvg,
    getCharacterFaceSvg,
    getCharacterHairSvg,
    removeCharacter,
    finalizeBook,
    nextStep,
    prevStep,
  }
})
