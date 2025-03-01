<template>
  <div class="body-editor border rounded-lg p-6">
    <h3 class="text-center text-2xl mb-6">Rodzaj sylwetki</h3>

    <div class="editor-grid grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left: Options -->
      <div class="options-panel">
        <!-- Body type -->
        <div class="form-group mb-6">
          <label class="block text-sm font-medium mb-2">Body Type</label>
          <div class="grid grid-cols-3 gap-2">
            <div
              v-for="type in bodyTypes"
              :key="type.id"
              :class="[
                'option-item p-2 border rounded text-center cursor-pointer',
                { selected: selectedBody.type === type.id },
              ]"
              @click="updateBody('type', type.id)"
            >
              <div class="icon-placeholder h-12 flex items-center justify-center text-2xl">
                {{ type.icon }}
              </div>
              <div class="text-xs mt-1">{{ type.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCharacterStore } from '@/stores/character'

const characterStore = useCharacterStore()

// Sample body customization options
const bodyTypes = [
  { id: 'average', name: 'Average', icon: '◯' },
  { id: 'athletic', name: 'Athletic', icon: '▬' },
  { id: 'slender', name: 'Slender', icon: '|' },
]

// Current body settings
const selectedBody = ref({
  type: 'average',
})

// Initialize from existing character data if available
onMounted(() => {
  const currentCharacter = characterStore.currentCharacter
  if (currentCharacter?.body) {
    selectedBody.value = { ...currentCharacter.body }
  }
})

// Update body property
const updateBody = (property: keyof typeof selectedBody.value, value: string) => {
  selectedBody.value[property] = value
  if (characterStore.currentCharacter) {
    characterStore.updateCharacterFeature('body', { ...selectedBody.value })
  }
}
</script>

<style scoped>
.option-item {
  transition: all 0.2s ease;
}

.option-item:hover {
  border-color: #90cdf4;
}

.option-item.selected {
  border-color: #3182ce;
  background-color: #ebf8ff;
}

.color-option {
  position: relative;
  border: 2px solid transparent;
  overflow: hidden;
}

.color-option.selected {
  border-color: #3182ce;
  box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.3);
}

.body-figure {
  transform: scale(var(--body-scale, 1));
  transition: transform 0.2s ease;
}
</style>
