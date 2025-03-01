<template>
  <div class="face-editor">
    <h2 class="text-xl font-bold mb-4">Wybierz twarz dla postaci</h2>
    
    <!-- Face Shape Selection -->
    <div class="feature-section mb-8">
      <h3 class="text-lg font-medium mb-3">Kształt twarzy</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="face in faceShapes" 
          :key="face.id"
          :class="['feature-option p-3 border rounded-lg cursor-pointer hover:border-blue-500 transition', 
                  {'border-blue-500 bg-blue-50': isSelected('face', face.id)}]"
          @click="selectFeature('face', face)"
        >
          <div class="svg-container flex justify-center mb-2" v-html="face.svg"></div>
          <div class="text-center text-sm">{{ face.name }}</div>
        </div>
      </div>
    </div>
    
    <!-- Eyes Selection -->
    <div class="feature-section mb-8">
      <h3 class="text-lg font-medium mb-3">Oczy</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="eyes in eyesOptions" 
          :key="eyes.id"
          :class="['feature-option p-3 border rounded-lg cursor-pointer hover:border-blue-500 transition', 
                  {'border-blue-500 bg-blue-50': isSelected('eyes', eyes.id)}]"
          @click="selectFeature('eyes', eyes)"
        >
          <div class="svg-container flex justify-center mb-2" v-html="eyes.svg"></div>
          <div class="text-center text-sm">{{ eyes.name }}</div>
        </div>
      </div>
    </div>
    
    <!-- Nose Selection -->
    <div class="feature-section mb-8">
      <h3 class="text-lg font-medium mb-3">Nos</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="nose in noseOptions" 
          :key="nose.id"
          :class="['feature-option p-3 border rounded-lg cursor-pointer hover:border-blue-500 transition', 
                  {'border-blue-500 bg-blue-50': isSelected('nose', nose.id)}]"
          @click="selectFeature('nose', nose)"
        >
          <div class="svg-container flex justify-center mb-2" v-html="nose.svg"></div>
          <div class="text-center text-sm">{{ nose.name }}</div>
        </div>
      </div>
    </div>
    
    <!-- Mouth Selection -->
    <div class="feature-section mb-8">
      <h3 class="text-lg font-medium mb-3">Usta</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="mouth in mouthOptions" 
          :key="mouth.id"
          :class="['feature-option p-3 border rounded-lg cursor-pointer hover:border-blue-500 transition', 
                  {'border-blue-500 bg-blue-50': isSelected('mouth', mouth.id)}]"
          @click="selectFeature('mouth', mouth)"
        >
          <div class="svg-container flex justify-center mb-2" v-html="mouth.svg"></div>
          <div class="text-center text-sm">{{ mouth.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { faceShapes, eyesOptions, noseOptions, mouthOptions } from '@/constants/characterAssets'
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
const selectFeature = (featureType: 'face' | 'eyes' | 'nose' | 'mouth', feature: CharacterFeature) => {
  characterStore.updateCharacterFeature(featureType, feature)
}

// Check if all face features are selected
const isComplete = computed(() => {
  const character = characterStore.currentCharacter
  return character?.face && character?.eyes && character?.nose && character?.mouth
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
