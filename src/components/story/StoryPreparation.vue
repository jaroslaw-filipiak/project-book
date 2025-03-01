<template>
  <div class="story-preparation">
    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-4">Stwórz indywidualną historię</h2>
      <p class="text-gray-600">
        Uzupełnij pytania do każdej postaci aby zbudować swoją włąsną historię
      </p>
    </div>

    <!-- Character info banner -->
    <div
      class="character-info-banner p-4 bg-blue-50 rounded-lg mb-6 flex items-center justify-between"
    >
      <div>
        <h3 class="font-bold">Creating story for: {{ currentCharacter?.name }}</h3>
        <p class="text-sm text-gray-600">
          Character {{ currentCharacterIndex + 1 }} of {{ characterStore.characters.length }}
        </p>
      </div>
      <CharacterPreview v-if="currentCharacter" :character="currentCharacter" :scale="0.5" />
    </div>

    <!-- Progress bar for overall story creation -->
    <div class="mb-6">
      <p class="text-sm text-gray-600 mb-1">Overall progress</p>
      <div class="progress-bar h-2 bg-gray-200 rounded-full">
        <div
          class="progress h-full bg-green-500 rounded-full"
          :style="{ width: `${overallProgressPercentage}%` }"
        ></div>
      </div>
    </div>

    <!-- Question panel -->
    <div v-if="currentCharacter" class="question-panel border rounded-lg p-6">
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">
            Question {{ bookStore.currentStoryStep }} of {{ bookStore.storyQuestions.length }}
          </h3>
        </div>

        <div class="progress-bar h-2 bg-gray-200 rounded-full">
          <div
            class="progress h-full bg-blue-500 rounded-full"
            :style="{
              width: `${(bookStore.currentStoryStep / bookStore.storyQuestions.length) * 100}%`,
            }"
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
          {{ isLastQuestion ? (isLastCharacter ? 'Finish' : 'Next Character') : 'Next Question' }}
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
import { ref, computed, onMounted, watch } from 'vue'
import { useBookStore } from '@/stores/book'
import { useCharacterStore } from '@/stores/character'
import CharacterPreview from '@/components/character/CharacterPreview.vue'

const bookStore = useBookStore()
const characterStore = useCharacterStore()

// Calculate current character index
const currentCharacterIndex = computed(() => {
  if (!bookStore.currentStoryCharacterId) return 0
  return characterStore.characters.findIndex(
    (char) => char.id === bookStore.currentStoryCharacterId,
  )
})

// Check if this is the last character
const isLastCharacter = computed(() => {
  return currentCharacterIndex.value === characterStore.characters.length - 1
})

// Overall progress percentage
const overallProgressPercentage = computed(() => {
  const totalQuestions = characterStore.characters.length * bookStore.storyQuestions.length
  const answeredQuestions = Object.values(bookStore.storyAnswers).reduce((total, answers) => {
    return total + Object.keys(answers).length
  }, 0)

  return (answeredQuestions / totalQuestions) * 100
})

// Get current character
const currentCharacter = computed(() =>
  characterStore.characters.find((char) => char.id === bookStore.currentStoryCharacterId),
)

// Get current question
const currentQuestion = computed(
  () => bookStore.storyQuestions[bookStore.currentStoryStep - 1] || bookStore.storyQuestions[0],
)

// Check if this is the last question
const isLastQuestion = computed(
  () => bookStore.currentStoryStep === bookStore.storyQuestions.length,
)

// Get current answer for this character and question
const currentAnswer = computed(() =>
  bookStore.getStoryAnswer(bookStore.currentStoryCharacterId || '', bookStore.currentStoryStep),
)

// Initialize the current character if not set
onMounted(() => {
  if (characterStore.characters.length > 0 && !bookStore.currentStoryCharacterId) {
    bookStore.currentStoryCharacterId = characterStore.characters[0].id
  }
})

// Check if an answer is selected
const isAnswerSelected = (answerId: string) => {
  return currentAnswer.value === answerId
}

// Select an answer
const selectAnswer = (answerId: string) => {
  if (bookStore.currentStoryCharacterId) {
    bookStore.saveStoryAnswer(
      bookStore.currentStoryCharacterId,
      bookStore.currentStoryStep,
      answerId,
    )
  }
}

// Go to the next question or next character
const goToNextQuestion = () => {
  // Only proceed if an answer has been selected
  if (!currentAnswer.value || !bookStore.currentStoryCharacterId) return

  if (isLastQuestion.value) {
    // If this is the last character, check if all are done
    if (isLastCharacter.value) {
      bookStore.nextStep() // Move to next main step (book design)
    } else {
      // Move to the next character
      const nextCharacterIndex = currentCharacterIndex.value + 1
      if (nextCharacterIndex < characterStore.characters.length) {
        bookStore.currentStoryCharacterId = characterStore.characters[nextCharacterIndex].id
        bookStore.currentStoryStep = 1 // Reset to first question for new character
      }
    }
  } else {
    // Just move to the next question for current character
    bookStore.nextStoryStep()
  }
}

// Check if all characters have completed their story questions
const areAllStoriesComplete = computed(() => {
  return (
    characterStore.characters.length > 0 &&
    characterStore.characters.every((char) => bookStore.isCharacterStoryComplete(char.id))
  )
})
</script>

<style scoped>
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

.character-info-banner {
  border-left: 4px solid #3182ce;
}
</style>
