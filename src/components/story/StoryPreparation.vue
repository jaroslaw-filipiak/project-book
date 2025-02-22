<template>
  <div class="container mx-auto p-4">
    <div class="max-w-2xl mx-auto">
      <div class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <button
            @click="bookStore.prevStep"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← Back to Characters
          </button>
          <h2 class="text-2xl font-bold">Przygotowanie historii</h2>
        </div>
        <div class="flex items-center gap-2 mb-4">
          <div 
            v-for="(step, index) in totalSteps" 
            :key="index"
            class="w-8 h-8 rounded-full flex items-center justify-center"
            :class="[
              currentStep === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200',
              index < currentStep ? 'bg-green-500 text-white' : ''
            ]"
          >
            {{ index + 1 }}
          </div>
        </div>
      </div>

      <div class="question-container border rounded-lg p-6">
        <h3 class="text-xl mb-6">{{ currentQuestion.text }}</h3>
        <div class="grid gap-4">
          <button
            v-for="option in currentQuestion.options"
            :key="option.id"
            @click="selectAnswer(option.id)"
            class="p-4 border rounded-lg text-left hover:bg-gray-50 transition"
            :class="{'border-blue-500': selectedAnswer === option.id}"
          >
            {{ option.text }}
          </button>
        </div>
      </div>

      <div class="mt-6 flex justify-between">
        <button
          @click="previousQuestion"
          class="px-4 py-2 border rounded"
          :disabled="currentStep === 1"
        >
          Previous
        </button>
        <button
          @click="nextQuestion"
          class="px-4 py-2 bg-blue-500 text-white rounded"
          :disabled="!canProceed"
        >
          {{ isLastStep ? 'Finish' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBookStore } from '@/stores/book'
import { storyQuestions } from '@/data/storyQuestions'

const bookStore = useBookStore()
const totalSteps = storyQuestions.length

const currentStep = computed({
  get: () => bookStore.currentStoryStep,
  set: (value: number) => bookStore.currentStoryStep = value
})

const currentQuestion = computed(() => storyQuestions[currentStep.value - 1])
const isLastStep = computed(() => currentStep.value === totalSteps)

const selectedAnswer = computed({
  get: () => bookStore.getCurrentStoryAnswer(currentStep.value),
  set: (value: string) => bookStore.setStoryAnswer(currentStep.value, value)
})

const canProceed = computed(() => selectedAnswer.value)

const selectAnswer = (optionId: string) => {
  selectedAnswer.value = optionId
}

const nextQuestion = () => {
  if (isLastStep.value) {
    bookStore.nextStep() // Move to step 3 (PageEditor)
  } else {
    currentStep.value++
  }
}

const previousQuestion = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}
</script>
