<template>
  <div class="creator-navigation flex mb-8 border-b">
    <router-link 
      to="/kreator/postacie" 
      class="step-tab px-6 py-3 font-medium"
    >
      Postacie
    </router-link>
    <router-link 
      :to="{ path: '/kreator/historia' }" 
      :class="[
        'step-tab px-6 py-3 font-medium',
        !charactersComplete ? 'cursor-not-allowed opacity-50' : ''
      ]"
      @click.prevent="navigateIfReady('/kreator/historia', charactersComplete)"
    >
      Historia
    </router-link>
    <router-link 
      :to="{ path: '/kreator/strony' }"
      :class="[
        'step-tab px-6 py-3 font-medium',
        !storiesComplete ? 'cursor-not-allowed opacity-50' : ''
      ]"
      @click.prevent="navigateIfReady('/kreator/strony', storiesComplete)"
    >
      Strony
    </router-link>
    <router-link 
      :to="{ path: '/kreator/podsumowanie' }"
      :class="[
        'step-tab px-6 py-3 font-medium',
        !bookComplete ? 'cursor-not-allowed opacity-50' : ''
      ]"
      @click.prevent="navigateIfReady('/kreator/podsumowanie', bookComplete)"
    >
      Podsumowanie
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/book'
import { useCharacterStore } from '@/stores/character'

const props = defineProps<{
  currentStep: string
}>()

const router = useRouter()
const bookStore = useBookStore()
const characterStore = useCharacterStore()

// Dependencies between steps
const charactersComplete = computed(() => characterStore.areAllCharactersComplete)

const storiesComplete = computed(() => 
  characterStore.characters.length > 0 &&
  characterStore.characters.every(char => bookStore.isCharacterStoryComplete(char.id))
)

const bookComplete = computed(() => 
  bookStore.pages.length === bookStore.maxPages && 
  bookStore.pages.every(page => page && page.templateId)
)

// Navigate if conditions are met
const navigateIfReady = (path: string, isReady: boolean) => {
  if (isReady) {
    router.push(path)
  }
}
</script>

<style scoped>
.step-tab {
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
}

.step-tab.router-link-active {
  color: #2b6cb0;
  border-bottom-color: #2b6cb0;
}
</style>