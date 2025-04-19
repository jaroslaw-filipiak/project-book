<template>
  <div class="accessories-editor">
    <h2 class="text-xl font-bold mb-4">Wybierz akcesoria dla postaci</h2>

    <div class="feature-section mb-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="accessory in accessoryOptions"
          :key="accessory.id"
          :class="[
            'feature-option border rounded-lg cursor-pointer hover:border-blue-500 transition',
            { 'border-blue-500 bg-blue-50': isSelected('accessories', accessory.id) },
          ]"
          @click="selectFeature('accessories', accessory)"
        >
          <div class="svg-container flex justify-center mb-2" v-html="accessory.svg"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { accessoryOptions } from '@/constants/characterAssets'
import type { CharacterFeature } from '@/types/book'

const characterStore = useCharacterStore()

// Check if a feature is selected
const isSelected = (featureType: string, featureId: string): boolean => {
  const character = characterStore.currentCharacter
  if (!character) return false

  // Sprawdzamy, czy istnieje pojedyncze akcesorium o tym ID
  if (featureType === 'accessories' && character.accessories && character.accessories.length > 0) {
    return character.accessories[0].id === featureId
  }

  return false
}

// Select a feature for the character (single accessory only)
const selectFeature = (featureType: 'accessories', feature: CharacterFeature) => {
  // Umieść wybrany element jako jedyny w tablicy
  characterStore.updateCharacterFeature(featureType, [feature])
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
