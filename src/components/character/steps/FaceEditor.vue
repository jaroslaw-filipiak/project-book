<template>
  <div class="face-editor border rounded-lg p-6">
    <h3 class="text-center text-2xl mb-6">Wybierz kształt twarzy</h3>

    <div class="editor-grid grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="options-panel">
        <!-- Face shape -->
        <div class="form-group mb-6">
          <label class="block text-sm font-medium mb-2">Face Shape</label>
          <div class="flex gap-2">
            <div
              v-for="shape in faceShapes"
              :key="shape.id"
              :class="[
                'option-item p-2 border rounded text-center cursor-pointer w-full',
                { selected: selectedFace.shape === shape.id },
              ]"
              @click="updateFaceShape(characterStore.currentCharacter?.id, shape.id)"
            >
              <div class="icon-placeholder h-12 flex items-center justify-center text-2xl">
                {{ shape.icon }}
              </div>
              <div class="text-xs mt-1">{{ shape.name }}</div>
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

// Sample face customization options
const faceShapes = [
  { id: 'round', name: 'Round', icon: '○' },
  { id: 'oval', name: 'Oval', icon: '⬭' },
  { id: 'square', name: 'Square', icon: '□' },
  { id: 'heart', name: 'Heart', icon: '❤' },
  { id: 'triangle', name: 'Triangle', icon: '△' },
]

// Define face type
interface Face {
  shape: string
}

// Current face settings
const selectedFace = ref<Face>({
  shape: 'round',
})

// Initialize from existing character data if available
onMounted(() => {
  const currentCharacter = characterStore.currentCharacter
  if (currentCharacter?.face) {
    selectedFace.value = { ...currentCharacter.face }
  }
})

// Update face property
const updateFaceShape = (characterId: string | undefined, shapeId: string) => {
  selectedFace.value.shape = shapeId
  if (characterId) {
    characterStore.updateCharacter(characterId, { face: selectedFace.value })
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

.face-features {
  font-size: 1.5rem;
  line-height: 1;
}
</style>
