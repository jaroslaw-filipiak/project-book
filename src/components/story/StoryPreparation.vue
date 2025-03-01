<template>
  <div class="story-preparation">
    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-4">Stwórz indywidualną historię</h2>
      <p class="text-gray-600">
        Uzupełnij pytania do każdej postaci aby zbudować swoją włąsną historię
      </p>
    </div>

    <!-- Character selection tabs -->
    <div class="character-tabs flex border-b mb-6">
      <div
        v-for="character in characterStore.characters"
        :key="character.id"
        :class="['character-tab px-6 py-3', { active: currentCharacterId === character.id }]"
        @click="setCurrentCharacter(character.id)"
      >
        {{ character.name }}
        <span v-if="isCharacterStoryComplete(character.id)" class="ml-2 text-green-500">✓</span>
      </div>
    </div>

    <!-- Question panel -->
    <div v-if="currentCharacter" class="question-panel border rounded-lg p-6">
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">
            Question {{ bookStore.currentStoryStep }} of {{ storyQuestions.length }}
          </h3>
          <div class="character-badge flex items-center">
            <span class="mr-2">{{ currentCharacter.name }}</span>
            <CharacterPreview :character="currentCharacter" :scale="0.5" />
          </div>
        </div>

        <div class="progress-bar h-2 bg-gray-200 rounded-full">
          <div
            class="progress h-full bg-blue-500 rounded-full"
            :style="{ width: `${(bookStore.currentStoryStep / storyQuestions.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Current question -->
      <div class="current-question">
        <h4 class="text-lg font-medium mb-4">{{ currentQuestion.question }}</h4>

        <div class="answers-grid grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div
            v-for="answer in currentQuestion.answers"
            :key="answer.id"
            :class="[
              'answer-card p-4 border rounded-lg cursor-pointer',
              { selected: isAnswerSelected(answer.id) },
            ]"
            @click="selectAnswer(answer.id)"
          >
            <div class="answer-content">
              {{ answer.text }}
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="navigation mt-8 flex justify-between">
        <button
          @click="bookStore.prevStoryStep"
          class="px-4 py-2 border rounded"
          :disabled="bookStore.currentStoryStep === 1"
        >
          Previous Question
        </button>

        <button
          @click="goToNextQuestion"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          :disabled="!currentAnswer"
        >
          {{ isLastQuestion ? 'Finish' : 'Next Question' }}
        </button>
      </div>
    </div>

    <!-- All done message -->
    <div v-if="areAllStoriesComplete" class="completed-state border rounded-lg p-6 text-center">
      <h3 class="text-2xl font-bold mb-4">All Characters Customized!</h3>
      <p class="text-gray-600 mb-6">
        You've completed all the questions for your characters. You're ready to create your book!
      </p>
      <button
        @click="bookStore.nextStep"
        class="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Continue to Book Design
      </button>
    </div>

    <!-- Global navigation -->
    <div v-if="!areAllStoriesComplete" class="navigation mt-8 flex justify-between">
      <button @click="bookStore.prevStep" class="px-4 py-2 border rounded">
        Back to Characters
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBookStore } from '@/stores/book'
import { useCharacterStore } from '@/stores/character'
import CharacterPreview from '@/components/character/CharacterPreview.vue'

const bookStore = useBookStore()
const characterStore = useCharacterStore()

// Sample story questions (in a real app, this would be imported from data files)
const storyQuestions = [
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
]

// Current character ID
const currentCharacterId = ref('')

// Set initial character if available
onMounted(() => {
  if (characterStore.characters.length > 0) {
    currentCharacterId.value = characterStore.characters[0].id
  }
})

// Get current character
const currentCharacter = computed(() =>
  characterStore.characters.find((char) => char.id === currentCharacterId.value),
)

// Get current question
const currentQuestion = computed(
  () => storyQuestions[bookStore.currentStoryStep - 1] || storyQuestions[0],
)

// Check if this is the last question
const isLastQuestion = computed(() => bookStore.currentStoryStep === storyQuestions.length)

// Get current answer for this character and question
const currentAnswer = computed(() =>
  bookStore.getStoryAnswer(currentCharacterId.value, bookStore.currentStoryStep),
)

// Set current character
const setCurrentCharacter = (characterId: string) => {
  currentCharacterId.value = characterId
}

// Check if an answer is selected
const isAnswerSelected = (answerId: string) => {
  return currentAnswer.value === answerId
}

// Select an answer
const selectAnswer = (answerId: string) => {
  bookStore.saveStoryAnswer(currentCharacterId.value, bookStore.currentStoryStep, answerId)
  // For debugging
  debugAnswerSelection()
}

// Go to the next question or finish if last
const goToNextQuestion = () => {
  // Only proceed if an answer has been selected
  if (!currentAnswer.value) return

  if (isLastQuestion.value) {
    // If all characters have completed all questions, move to next step
    if (areAllCharactersStoryComplete.value) {
      bookStore.nextStep()
    } else {
      // Find next character that hasn't completed questions
      const nextCharacter = characterStore.characters.find(
        (char) => !isCharacterStoryComplete(char.id) && char.id !== currentCharacterId.value,
      )

      if (nextCharacter) {
        currentCharacterId.value = nextCharacter.id
        bookStore.currentStoryStep = 1
      }
    }
  } else {
    bookStore.nextStoryStep()
  }
}

// Check if a character has completed all questions
const isCharacterStoryComplete = (characterId: string) => {
  return bookStore.isCharacterStoryComplete(characterId)
}

// Check if all characters have completed their story questions
const areAllCharactersStoryComplete = computed(() =>
  characterStore.characters.every((char) => isCharacterStoryComplete(char.id)),
)

// Are all stories complete (convenience alias)
const areAllStoriesComplete = computed(() => areAllCharactersStoryComplete.value)

// Debug function to check what's happening with answer selection
const debugAnswerSelection = () => {
  console.log('Current character ID:', currentCharacterId.value)
  console.log('Current step:', bookStore.currentStoryStep)
  console.log('Current answer:', currentAnswer.value)
  console.log('Question:', currentQuestion.value)
  console.log('All answers:', bookStore.storyAnswers)
}
</script>

<style scoped>
.character-tab {
  cursor: pointer;
  font-weight: 500;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
}

.character-tab.active {
  color: #2b6cb0;
  border-bottom-color: #2b6cb0;
}

.answer-card {
  transition: all 0.2s ease;
}

.answer-card:hover {
  border-color: #90cdf4;
}

.answer-card.selected {
  border-color: #3182ce;
  background-color: #ebf8ff;
}

.character-badge {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: #f7fafc;
}
</style>
