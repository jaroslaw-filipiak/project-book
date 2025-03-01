<template>
  <div class="body-editor">
    <h2 class="text-xl font-bold mb-4">Wybierz ciało dla postaci</h2>
    
    <!-- Body Type Selection -->
    <div class="feature-section mb-8">
      <h3 class="text-lg font-medium mb-3">Typ ciała</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div 
          v-for="body in bodyOptions" 
          :key="body.id"
          :class="['feature-option p-3 border rounded-lg cursor-pointer hover:border-blue-500 transition', 
                  {'border-blue-500 bg-blue-50': isSelected('body', body.id)}]"
          @click="selectFeature('body', body)"
        >
          <div class="svg-container flex justify-center mb-2" v-html="body.svg"></div>
          <div class="text-center text-sm">{{ body.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { bodyOptions } from '@/constants/characterAssets'
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
const selectFeature = (featureType: 'body', feature: CharacterFeature) => {
  characterStore.updateCharacterFeature(featureType, feature)
}

// Check if body is selected
const isComplete = computed(() => {
  const character = characterStore.currentCharacter
  return !!character?.body
})
</script>

<style scoped>
.feature-option {
  aspect-ratio: 0.75;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.svg-container {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
