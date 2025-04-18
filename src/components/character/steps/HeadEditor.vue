<template>
  <div class="head-editor">
    <h2 class="text-xl font-bold mb-4">Wybierz głowę dla postaci</h2>

    <!-- Head Shape Selection -->
    <div class="feature-section mb-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="head in faceShapes"
          :key="head.id"
          :class="[
            'feature-option border rounded-lg cursor-pointer hover:border-blue-500 transition overflow-hidden',
            { 'border-blue-500 bg-blue-50': isSelected('head', head.id) },
          ]"
          @click="selectFeature('head', head)"
        >
          <div class="svg-container flex items-center justify-center p-10" v-html="head.svg"></div>
          <div class="text-center text-sm">{{ head.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { faceShapes } from '@/constants/characterAssets'
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
const selectFeature = (featureType: 'head', feature: CharacterFeature) => {
  characterStore.updateCharacterFeature(featureType, feature)
}

// Check if head is selected
const isComplete = computed(() => {
  const character = characterStore.currentCharacter
  return !!character?.head
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