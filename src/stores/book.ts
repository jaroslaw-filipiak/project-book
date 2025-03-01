import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { BookPage } from '@/types/book'

export const useBookStore = defineStore('book', () => {
  // Main flow steps
  // 1: Character Creation
  // 2: Story Preparation (questions for each character)
  // 3: Page Design
  const currentStep = ref(1)
  const pages = ref<BookPage[]>([])
  const maxPages = 12
  const saving = ref(false)

  // Story customization
  const storyQuestions = ref<any[]>([
    {
      id: 'q1',
      question: "What is your character's favorite activity?",
      answers: [
        { id: 'a1_1', text: 'Playing sports' },
        { id: 'a1_2', text: 'Reading books' },
        { id: 'a1_3', text: 'Drawing and painting' },
        { id: 'a1_4', text: 'Playing music' },
      ],
    },
    {
      id: 'q2',
      question: "What is your character's favorite place?",
      answers: [
        { id: 'a2_1', text: 'Mountains' },
        { id: 'a2_2', text: 'Beach' },
        { id: 'a2_3', text: 'Forest' },
        { id: 'a2_4', text: 'City' },
      ],
    },
    {
      id: 'q3',
      question: "What is your character's greatest wish?",
      answers: [
        { id: 'a3_1', text: 'To have an adventure' },
        { id: 'a3_2', text: 'To make new friends' },
        { id: 'a3_3', text: 'To discover a mystery' },
        { id: 'a3_4', text: 'To learn a new skill' },
      ],
    },
  ]) // Now we define the questions in the store

  const storyAnswers = ref<Record<string, Record<number, string>>>({}) // characterId -> {questionNumber: answerId}

  // Current character for story creation
  const currentStoryCharacterId = ref<string | null>(null)

  // Current question for each character
  const currentStoryStep = ref(1)

  const isComplete = computed(() => pages.value.length === maxPages)

  function updatePage(index: number, pageData: Partial<BookPage>) {
    if (index >= 0 && index < pages.value.length) {
      pages.value[index] = { ...pages.value[index], ...pageData }
    } else {
      pages.value.push(pageData as BookPage)
    }
  }

  function getTemplateComponent(templateId: string) {
    // Implementation would depend on your project structure
    // This is just a placeholder
    return null
  }

  function getCharacterSvg(characterData: any, pose: string): string {
    // Combine character parts (body, face, hair) into a single SVG
    // This is a placeholder implementation
    return ''
  }

  function saveStoryAnswer(characterId: string, questionNumber: number, answerId: string) {
    if (!storyAnswers.value[characterId]) {
      storyAnswers.value[characterId] = {}
    }
    storyAnswers.value[characterId][questionNumber] = answerId
  }

  function getStoryAnswer(characterId: string, questionNumber: number): string {
    return storyAnswers.value[characterId]?.[questionNumber] || ''
  }

  function isCharacterStoryComplete(characterId: string): boolean {
    const answers = storyAnswers.value[characterId] || {}
    return Object.keys(answers).length === storyQuestions.value.length
  }

  function areAllStoriesComplete(): boolean {
    // This would depend on the useCharacterStore
    // For now, just check if we have any story answers
    return (
      Object.keys(storyAnswers.value).length > 0 &&
      Object.values(storyAnswers.value).every(
        (answers) => Object.keys(answers).length === storyQuestions.value.length,
      )
    )
  }

  async function finalizeBook() {
    saving.value = true
    try {
      // Implementation for saving the book
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

  function nextStoryStep() {
    if (currentStoryStep.value < storyQuestions.value.length) {
      currentStoryStep.value++
    }
  }

  function prevStoryStep() {
    if (currentStoryStep.value > 1) {
      currentStoryStep.value--
    }
  }

  return {
    pages,
    currentStep,
    currentStoryStep,
    currentStoryCharacterId,
    maxPages,
    saving,
    isComplete,
    storyQuestions,
    storyAnswers,
    updatePage,
    getTemplateComponent,
    getCharacterSvg,
    saveStoryAnswer,
    getStoryAnswer,
    isCharacterStoryComplete,
    areAllStoriesComplete,
    finalizeBook,
    nextStep,
    prevStep,
    nextStoryStep,
    prevStoryStep,
  }
})
