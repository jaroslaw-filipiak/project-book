<!-- src/views/BookCreator.vue -->
<template>
  <div class="book-creator container">
    <div class="steps">
      <CharacterCreator v-if="bookStore.currentStep === 1" />
      <PageEditor v-if="bookStore.currentStep === 2" />
    </div>

    <div class="navigation border flex items-center justify-center gap-10 mt-10">
      <button
        @click="prevStep"
        :disabled="bookStore.currentStep <= 1 && characterStore.currentStep === 1"
      >
        Previous
      </button>
      <button @click="nextStep" :disabled="bookStore.currentStep === 2">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterCreator from '@/components/character/CharacterCreator.vue'
import PageEditor from '@/components/book/PageEditor.vue'

import { useBookStore } from '@/stores/book'
import { useCharacterStore } from '@/stores/characters'

const bookStore = useBookStore()
const characterStore = useCharacterStore()

const nextStep = () => {
  characterStore.nextStep()

  if (characterStore.currentStep === characterStore.maxSteps + 1) {
    bookStore.nextStep()
  }
}

const prevStep = () => {
  if (characterStore.currentStep > characterStore.maxSteps) {
    bookStore.prevStep()
    characterStore.prevStep()
  } else {
    characterStore.prevStep()
  }
}
</script>
