<template>
  <div class="container mx-auto p-4">
    <div class="max-w-2xl mx-auto">
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Przygotowanie historii</h2>
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
            :class="{'border-blue-500': selectedAnswers[currentStep] === option.id}"
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
const currentStep = ref(1)
const selectedAnswers = ref<Record<number, string>>({})

const totalSteps = storyQuestions.length

const currentQuestion = computed(() => storyQuestions[currentStep.value - 1])
const isLastStep = computed(() => currentStep.value === totalSteps)
const canProceed = computed(() => selectedAnswers.value[currentStep.value])

const selectAnswer = (optionId: string) => {
  selectedAnswers.value[currentStep.value] = optionId
}

const nextQuestion = () => {
  if (isLastStep.value) {
    bookStore.setStoryAnswers(selectedAnswers.value)
    bookStore.nextStep() // This will move to step 3 (PageEditor)
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
