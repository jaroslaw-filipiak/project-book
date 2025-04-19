<template>
  <div class="facial-hair-editor">
    <h2 class="text-xl font-bold mb-4">Wybierz zarost dla postaci</h2>

    <!-- Facial hair options -->
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
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { facialHairOptions } from '@/constants/characterAssets'
import type { CharacterFeature } from '@/types/book'

const characterStore = useCharacterStore()

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
