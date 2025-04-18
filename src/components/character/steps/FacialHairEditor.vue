<template>
  <div class="facial-hair-editor">
    <h2 class="text-xl font-bold mb-4">Wybierz zarost dla postaci</h2>

    <!-- Placeholder for facial hair options -->
    <div v-if="characterStore.currentCharacter?.sex === 'male'" class="feature-section mb-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="facialHair in facialHairOptions"
          :key="facialHair.id"
          :class="[
            'feature-option border rounded-lg cursor-pointer hover:border-blue-500 transition',
            { 'border-blue-500 bg-blue-50': isSelected('facialHair', facialHair.id) },
          ]"
          @click="selectFeature('facialHair', facialHair)"
        >
          <div class="svg-container flex justify-center mb-2" v-html="facialHair.svg"></div>
          <div class="text-center text-sm">{{ facialHair.name }}</div>
        </div>
      </div>
    </div>

    <!-- Message for female characters -->
    <div v-else class="text-center py-8 text-gray-500">
      <p>Ta opcja jest dostępna tylko dla postaci męskich</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import type { CharacterFeature } from '@/types/book'

const characterStore = useCharacterStore()

// Sample facial hair options (you would replace these with actual SVG content)
const facialHairOptions = ref([
  {
    id: 'beard_full',
    name: 'Pełna broda',
    svg: `<svg width="100" height="80" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,20 Q50,60 70,20 Q70,45 50,60 Q30,45 30,20 Z" fill="#8B4513" stroke="#000" stroke-width="1" />
    </svg>`,
  },
  {
    id: 'beard_goatee',
    name: 'Kozia bródka',
    svg: `<svg width="100" height="80" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M45,20 Q50,60 55,20 Q55,40 50,50 Q45,40 45,20 Z" fill="#8B4513" stroke="#000" stroke-width="1" />
    </svg>`,
  },
  {
    id: 'moustache',
    name: 'Wąsy',
    svg: `<svg width="100" height="80" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,30 Q50,40 70,30" fill="none" stroke="#8B4513" stroke-width="5" />
    </svg>`,
  },
  {
    id: 'beard_none',
    name: 'Brak',
    svg: `<svg width="100" height="80" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"></svg>`,
  },
])

// Check if a feature is selected
const isSelected = (featureType: string, featureId: string): boolean => {
  const character = characterStore.currentCharacter
  if (!character) return false

  const feature = character[featureType as keyof typeof character] as CharacterFeature | undefined
  return feature?.id === featureId
}

// Select a feature for the character
const selectFeature = (featureType: 'facialHair', feature: CharacterFeature) => {
  characterStore.updateCharacterFeature(featureType, feature)
}
</script>

<style scoped>
.feature-option {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.svg-container {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>