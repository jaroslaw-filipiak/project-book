<template>
  <div class="body-editor">
    <h2 class="text-xl font-bold mb-4">Wybierz strój dla postaci</h2>

    <!-- Body Selection -->
    <div class="feature-section mb-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="body in filteredBodyOptions"
          :key="body.id"
          :class="[
            'feature-option border rounded-lg cursor-pointer hover:border-blue-500 transition overflow-hidden',
            { 'border-blue-500 bg-blue-50': isSelected('body', body.id) },
          ]"
          @click="selectFeature('body', body)"
        >
          <div class="svg-container flex items-center justify-center p-4" v-html="body.svg"></div>
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

// Filtrujemy opcje ciała zależnie od płci postaci
const filteredBodyOptions = computed(() => {
  const characterSex = characterStore.currentCharacter?.sex

  return bodyOptions.filter((body) => {
    // Jeśli opcja nie ma określonej płci, jest dostępna dla wszystkich
    if (!body.forSex) return true

    // Jeśli opcja ma określoną płeć, sprawdzamy czy pasuje do płci postaci
    return body.forSex === characterSex || body.forSex === 'both'
  })
})

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
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.svg-container {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
