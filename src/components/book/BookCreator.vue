<!-- components/book/BookCreator.vue -->
<template>
  <div class="book-creator">
    <!-- Navigation steps -->
    <div class="steps-navigation">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        :class="['step', { active: currentStep === index }]"
        @click="setStep(index)"
      >
        {{ step.title }}
      </div>
    </div>

    <!-- Main content area -->
    <div class="content-area">
      <!-- Character selection/creation step -->
      <div v-if="currentStep === 0">
        <CharacterManager :characters="characters" @character-created="handleCharacterCreated" />
      </div>

      <!-- Page editor step -->
      <div v-if="currentStep === 1">
        <PageEditor
          :characters="characters"
          :current-page="currentPage"
          @page-updated="handlePageUpdate"
        />
      </div>

      <!-- Book preview step -->
      <div v-if="currentStep === 2">
        <BookPreview :pages="bookStore.pages" @edit-page="handleEditPage" />
      </div>
    </div>

    <!-- Navigation buttons -->
    <div class="navigation-buttons">
      <button v-if="currentStep > 0" @click="prevStep">Previous</button>
      <button v-if="currentStep < steps.length - 1" @click="nextStep" :disabled="!canProceed">
        Next
      </button>
      <button v-if="currentStep === steps.length - 1" @click="finishBook">Finish & Order</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBookStore } from '@/stores/book'
import CharacterManager from '../character/CharacterManager.vue'
import PageEditor from './PageEditor.vue'
import BookPreview from './BookPreview.vue'

const bookStore = useBookStore()
const currentStep = ref(0)
const currentPage = ref(0)

const steps = [
  { id: 'characters', title: 'Create Characters' },
  { id: 'pages', title: 'Design Pages' },
  { id: 'preview', title: 'Preview Book' },
]

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0:
      return bookStore.characters.length > 0
    case 1:
      return bookStore.pages.length >= bookStore.minPages
    default:
      return true
  }
})

const setStep = (step: number) => {
  if (step <= currentStep.value || canProceed.value) {
    currentStep.value = step
  }
}

const handleCharacterCreated = (character) => {
  bookStore.addCharacter(character)
}

const handlePageUpdate = (pageData) => {
  bookStore.updatePage(currentPage.value, pageData)
}

const handleEditPage = (pageIndex: number) => {
  currentPage.value = pageIndex
  currentStep.value = 1
}

const finishBook = async () => {
  await bookStore.finalizeBook()
  // Redirect to checkout or confirmation
}
</script>

<style scoped lang="scss">
.book-creator {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;

  .steps-navigation {
    display: flex;
    gap: 1rem;

    .step {
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-bottom: 2px solid transparent;

      &.active {
        border-bottom-color: #42b883;
      }
    }
  }

  .navigation-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
}
</style>
