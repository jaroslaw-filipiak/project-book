import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { BookPage, StoryQuestion } from '@/types/book'

export const useBookStore = defineStore('book', () => {
  // Main flow steps
  // 1: Character Creation
  // 2: Story Preparation (questions for each character)
  // 3: Page Design
  const currentStep = ref(1)
  const pages = ref<BookPage[]>([])
  const maxPages = 12
  const saving = ref(false)

  // Define questions for different character types
  // Common questions for all characters
  const commonQuestions = [
    {
      id: 'q_common_1',
      question: "Co lubi robić twoja postać w wolnym czasie?",
      answers: [
        { id: 'a_common_1_1', text: 'Spędzać czas na świeżym powietrzu' },
        { id: 'a_common_1_2', text: 'Czytać książki' },
        { id: 'a_common_1_3', text: 'Bawić się z przyjaciółmi' },
        { id: 'a_common_1_4', text: 'Konstruować i budować' },
      ],
    },
  ]

  // Questions specific to male characters
  const boyQuestions = [
    {
      id: 'q_boy_1',
      question: "Jaki jest ulubiony sport twojego bohatera?",
      answers: [
        { id: 'a_boy_1_1', text: 'Piłka nożna' },
        { id: 'a_boy_1_2', text: 'Koszykówka' },
        { id: 'a_boy_1_3', text: 'Pływanie' },
        { id: 'a_boy_1_4', text: 'Nie interesuje się sportem' },
      ],
    },
    {
      id: 'q_boy_2',
      question: "Jaki talent posiada twój bohater?",
      answers: [
        { id: 'a_boy_2_1', text: 'Jest bardzo silny' },
        { id: 'a_boy_2_2', text: 'Jest bardzo szybki' },
        { id: 'a_boy_2_3', text: 'Jest bardzo sprytny' },
        { id: 'a_boy_2_4', text: 'Potrafi rozśmieszać innych' },
      ],
    },
  ]

  // Questions specific to female characters
  const girlQuestions = [
    {
      id: 'q_girl_1',
      question: "Co najbardziej lubi robić twoja bohaterka?",
      answers: [
        { id: 'a_girl_1_1', text: 'Tańczyć' },
        { id: 'a_girl_1_2', text: 'Śpiewać' },
        { id: 'a_girl_1_3', text: 'Malować' },
        { id: 'a_girl_1_4', text: 'Eksperymentować' },
      ],
    },
    {
      id: 'q_girl_2',
      question: "Jaki szczególny talent posiada twoja bohaterka?",
      answers: [
        { id: 'a_girl_2_1', text: 'Jest bardzo kreatywna' },
        { id: 'a_girl_2_2', text: 'Jest bardzo mądra' },
        { id: 'a_girl_2_3', text: 'Jest bardzo odważna' },
        { id: 'a_girl_2_4', text: 'Potrafi zrozumieć innych' },
      ],
    },
  ]

  // Both character types share these questions
  const sharedQuestions = [
    {
      id: 'q_shared_1',
      question: "Jakie jest największe marzenie twojej postaci?",
      answers: [
        { id: 'a_shared_1_1', text: 'Przeżyć wielką przygodę' },
        { id: 'a_shared_1_2', text: 'Znaleźć najlepszego przyjaciela' },
        { id: 'a_shared_1_3', text: 'Odkryć tajemnicę' },
        { id: 'a_shared_1_4', text: 'Nauczyć się nowej umiejętności' },
      ],
    },
    {
      id: 'q_shared_2',
      question: "Gdzie twoja postać najbardziej lubi spędzać czas?",
      answers: [
        { id: 'a_shared_2_1', text: 'W lesie' },
        { id: 'a_shared_2_2', text: 'Na plaży' },
        { id: 'a_shared_2_3', text: 'W górach' },
        { id: 'a_shared_2_4', text: 'W domu' },
      ],
    }
  ]
  
  // Story customization - this will hold the questions for the current character
  const storyQuestions = ref<StoryQuestion[]>([])
  
  // Map to store character-specific questions (characterId -> questions array)
  const characterQuestions = ref<Record<string, StoryQuestion[]>>({})

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

  // Get fixed question set based on character sex
  function getQuestionsForSex(sex: 'male' | 'female'): StoryQuestion[] {
    // Common questions for all characters
    const questions = [...commonQuestions]
    
    // Add sex-specific questions
    if (sex === 'male') {
      questions.push(...boyQuestions)
    } else {
      questions.push(...girlQuestions)
    }
    
    // Add shared questions for both
    questions.push(...sharedQuestions)
    
    return questions
  }
  
  // Associate pre-determined questions with a character
  function assignQuestionsToCharacter(characterId: string, sex: 'male' | 'female'): void {
    // Get the fixed question set for this sex
    const questions = getQuestionsForSex(sex)
    
    // Assign these questions to the character
    characterQuestions.value[characterId] = questions
  }
  
  // Set the current character for story editing
  function setCurrentStoryCharacter(characterId: string, sex: 'male' | 'female') {
    currentStoryCharacterId.value = characterId
    currentStoryStep.value = 1 // Reset to first question
    
    // Ensure questions are assigned for this character
    if (!characterQuestions.value[characterId]) {
      assignQuestionsToCharacter(characterId, sex)
    }
    
    // Set the current questions to this character's question set
    storyQuestions.value = characterQuestions.value[characterId]
  }

  function isCharacterStoryComplete(characterId: string): boolean {
    const answers = storyAnswers.value[characterId] || {}
    const questions = characterQuestions.value[characterId] || []
    
    // Need to have answered all questions for this character
    return questions.length > 0 && Object.keys(answers).length === questions.length
  }

  function areAllStoriesComplete(): boolean {
    // Check if all characters have completed their stories
    const characterIds = Object.keys(characterQuestions.value)
    
    return (
      characterIds.length > 0 &&
      characterIds.every(charId => isCharacterStoryComplete(charId))
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
    characterQuestions,
    updatePage,
    getTemplateComponent,
    getCharacterSvg,
    saveStoryAnswer,
    getStoryAnswer,
    getQuestionsForSex,
    assignQuestionsToCharacter,
    setCurrentStoryCharacter,
    isCharacterStoryComplete,
    areAllStoriesComplete,
    finalizeBook,
    nextStep,
    prevStep,
    nextStoryStep,
    prevStoryStep,
  }
})
