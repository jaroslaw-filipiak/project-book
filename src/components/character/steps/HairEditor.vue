<template>
  <div class="hair-editor">
    <h2 class="text-xl font-bold mb-4">Wybierz fryzurę dla postaci</h2>
    
    <!-- Hair Style Selection -->
    <div class="feature-section mb-8">
      <h3 class="text-lg font-medium mb-3">Styl włosów</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div 
          v-for="hair in filteredHairOptions" 
          :key="hair.id"
          :class="['feature-option p-3 border rounded-lg cursor-pointer hover:border-blue-500 transition', 
                  {'border-blue-500 bg-blue-50': isSelected('hair', hair.id)}]"
          @click="selectFeature('hair', hair)"
        >
          <div class="svg-container flex justify-center mb-2" v-html="hair.svg"></div>
          <div class="text-center text-sm">{{ hair.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { hairOptions } from '@/constants/characterAssets'
import type { CharacterFeature } from '@/types/book'

const characterStore = useCharacterStore()

// Filter hair options based on character sex
const filteredHairOptions = computed(() => {
  const characterSex = characterStore.currentCharacter?.sex || 'male';
  
  return hairOptions.filter(hair => 
    hair.forSex === characterSex || 
    hair.forSex === 'both' || 
    !hair.forSex
  );
});

// Check if a feature is selected
const isSelected = (featureType: string, featureId: string): boolean => {
  const character = characterStore.currentCharacter
  if (!character) return false
  
  const feature = character[featureType as keyof typeof character] as CharacterFeature | undefined
  return feature?.id === featureId
}

// Select a feature for the character
const selectFeature = (featureType: 'hair', feature: CharacterFeature) => {
  characterStore.updateCharacterFeature(featureType, feature)
}

// Check if hair is selected
const isComplete = computed(() => {
  const character = characterStore.currentCharacter
  return !!character?.hair
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
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
