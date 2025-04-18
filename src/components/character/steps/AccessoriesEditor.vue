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
            { 'border-blue-500 bg-blue-50': isAccessorySelected(accessory.id) },
          ]"
          @click="toggleAccessory(accessory)"
        >
          <div class="svg-container flex justify-center mb-2" v-html="accessory.svg"></div>
          <div class="text-center text-sm">{{ accessory.name }}</div>
        </div>
      </div>
    </div>

    <!-- Selected accessories -->
    <div v-if="selectedAccessories.length > 0" class="selected-items p-4 bg-gray-50 rounded-lg mb-6">
      <h3 class="font-medium mb-2">Wybrane akcesoria:</h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="accessory in selectedAccessories"
          :key="accessory.id"
          class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
        >
          {{ accessory.name }}
          <button @click="removeAccessory(accessory)" class="ml-2 text-blue-600">&times;</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { accessoryOptions } from '@/constants/characterAssets'
import type { CharacterFeature } from '@/types/book'

const characterStore = useCharacterStore()

// Get currently selected accessories
const selectedAccessories = computed(() => {
  return characterStore.currentCharacter?.accessories || []
})

// Check if an accessory is selected
const isAccessorySelected = (accessoryId: string): boolean => {
  return !!selectedAccessories.value.find(acc => acc.id === accessoryId)
}

// Add or remove an accessory
const toggleAccessory = (accessory: CharacterFeature) => {
  const currentAccessories = [...(characterStore.currentCharacter?.accessories || [])]
  const index = currentAccessories.findIndex(acc => acc.id === accessory.id)
  
  if (index === -1) {
    // Add accessory if not already selected
    currentAccessories.push(accessory)
  } else {
    // Remove if already selected
    currentAccessories.splice(index, 1)
  }
  
  characterStore.updateCharacterFeature('accessories', currentAccessories)
}

// Remove an accessory
const removeAccessory = (accessory: CharacterFeature) => {
  const currentAccessories = [...(characterStore.currentCharacter?.accessories || [])]
  const index = currentAccessories.findIndex(acc => acc.id === accessory.id)
  
  if (index !== -1) {
    currentAccessories.splice(index, 1)
    characterStore.updateCharacterFeature('accessories', currentAccessories)
  }
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