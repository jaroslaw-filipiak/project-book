import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Character } from './characters'
import type { BookPage, BookTemplate } from '@/types/book'

export const useBookStore = defineStore('book', () => {
  const pages = ref<BookPage[]>([])
  const characters = ref<Character[]>([])
  const currentStep = ref(1)
  const minPages = 6
  const maxPages = 12
  const saving = ref(false)

  const isComplete = computed(() => 
    pages.value.length >= minPages && 
    characters.value.length > 0
  )

  function addCharacter(character: Character) {
    characters.value.push(character)
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

  function getTemplate(templateId: string): BookTemplate {
    // TODO: Implement template retrieval
    return {
      id: templateId,
      name: '',
      characterPosition: {},
      textPositions: {},
      options: []
    }
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
      await new Promise(resolve => setTimeout(resolve, 1000))
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
    pages,
    characters,
    currentStep,
    minPages,
    maxPages,
    saving,
    isComplete,
    addCharacter,
    updatePage,
    getTemplateComponent,
    getTemplate,
    getCharacterSvg,
    getCharacterBodySvg,
    getCharacterFaceSvg,
    getCharacterHairSvg,
    finalizeBook,
    nextStep,
    prevStep
  }
})
