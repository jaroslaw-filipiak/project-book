<template>
  <div class="face-editor">
    <h2 class="text-xl font-bold mb-4">Wybierz wyraz twarzy postaci</h2>

    <!-- Face Expressions Selection -->
    <div class="feature-section mb-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="face in faceExpressionOptions"
          :key="face.id"
          :class="[
            'feature-option border rounded-lg cursor-pointer hover:border-blue-500 transition overflow-hidden',
            { 'border-blue-500 bg-blue-50': isSelected('face', face.id) },
          ]"
          @click="selectFeature('face', face)"
        >
          <div class="svg-container flex items-center justify-center p-4" v-html="face.svg"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { faceExpressionOptions } from '@/constants/characterAssets'
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
const selectFeature = (featureType: 'face', feature: CharacterFeature) => {
  characterStore.updateCharacterFeature(featureType, feature)
}

// Check if face is selected
const isComplete = computed(() => {
  const character = characterStore.currentCharacter
  return !!character?.face
})
</script>

<style scoped>
.feature-option {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.svg-container {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
