<template>
  <div class="hair-editor border rounded-lg p-6">
    <h3 class="text-center text-2xl mb-6">Włosy</h3>

    <div class="editor-grid grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left: Options -->
      <div class="options-panel">
        <!-- Hair style -->
        <div class="form-group mb-6">
          <label class="block text-sm font-medium mb-2">Styl</label>
          <div class="grid grid-cols-3 gap-2">
            <div
              v-for="style in hairStyles"
              :key="style.id"
              :class="[
                'option-item p-2 border rounded text-center cursor-pointer',
                { selected: selectedHair.style === style.id },
              ]"
              @click="
                characterStore.currentCharacter &&
                updateHair(characterStore.currentCharacter.id, 'style', style.id)
              "
            >
              <div class="icon-placeholder h-12 flex items-center justify-center text-2xl">
                {{ style.icon }}
              </div>
              <div class="text-xs mt-1">{{ style.name }}</div>
            </div>
          </div>
        </div>

        <!-- Hair length -->
        <div class="form-group mb-6">
          <label class="block text-sm font-medium mb-2">Długość</label>
          <div class="grid grid-cols-3 gap-2">
            <div
              v-for="length in hairLengths"
              :key="length.id"
              :class="[
                'option-item p-2 border rounded text-center cursor-pointer',
                { selected: selectedHair.length === length.id },
              ]"
              @click="
                characterStore.currentCharacter &&
                updateHair(characterStore.currentCharacter.id, 'length', length.id)
              "
            >
              <div class="icon-placeholder h-12 flex items-center justify-center text-2xl">
                {{ length.icon }}
              </div>
              <div class="text-xs mt-1">{{ length.name }}</div>
            </div>
          </div>
        </div>

        <!-- Hair accessories -->
        <div class="form-group mb-6">
          <label class="block text-sm font-medium mb-2">Akcesoria</label>
          <div class="grid grid-cols-3 gap-2">
            <div
              v-for="accessory in hairAccessories"
              :key="accessory.id"
              :class="[
                'option-item p-2 border rounded text-center cursor-pointer',
                { selected: selectedHair.accessory === accessory.id },
              ]"
              @click="
                characterStore.currentCharacter &&
                updateHair(characterStore.currentCharacter.id, 'accessory', accessory.id)
              "
            >
              <div class="icon-placeholder h-12 flex items-center justify-center text-2xl">
                {{ accessory.icon }}
              </div>
              <div class="text-xs mt-1">{{ accessory.name }}</div>
            </div>
          </div>
        </div>

        <!-- Hair color -->
        <div class="form-group">
          <label class="block text-sm font-medium mb-2">Kolor</label>
          <div class="grid grid-cols-6 gap-2">
            <div
              v-for="color in hairColors"
              :key="color.id"
              :class="[
                'color-option h-10 rounded cursor-pointer',
                { selected: selectedHair.color === color.id },
              ]"
              :style="{ backgroundColor: color.value }"
              @click="
                characterStore.currentCharacter &&
                updateHair(characterStore.currentCharacter.id, 'color', color.id)
              "
            ></div>
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

// Sample hair customization options
const hairStyles = [
  { id: 'straight', name: 'Straight', icon: '⇣' },
  { id: 'wavy', name: 'Wavy', icon: '≈' },
  { id: 'curly', name: 'Curly', icon: '@' },
  { id: 'spiky', name: 'Spiky', icon: '⁂' },
  { id: 'bald', name: 'Bald', icon: '○' },
  { id: 'ponytail', name: 'Ponytail', icon: 'ʘ' },
]

const hairLengths = [
  { id: 'short', name: 'Short', icon: '▁' },
  { id: 'medium', name: 'Medium', icon: '▃' },
  { id: 'long', name: 'Long', icon: '▇' },
]

const hairAccessories = [
  { id: 'none', name: 'None', icon: '∅' },
  { id: 'hat', name: 'Hat', icon: '⌂' },
  { id: 'bow', name: 'Bow', icon: '◇' },
  { id: 'headband', name: 'Headband', icon: '―' },
  { id: 'crown', name: 'Crown', icon: '♛' },
  { id: 'bandana', name: 'Bandana', icon: '▲' },
]

const hairColors = [
  { id: 'black', name: 'Black', value: '#2D3748' },
  { id: 'brown', name: 'Brown', value: '#8B4513' },
  { id: 'blonde', name: 'Blonde', value: '#F6E05E' },
  { id: 'red', name: 'Red', value: '#E53E3E' },
  { id: 'blue', name: 'Blue', value: '#2B6CB0' },
  { id: 'pink', name: 'Pink', value: '#ED64A6' },
]

// Current hair settings
const selectedHair = ref({
  style: 'straight',
  length: 'medium',
  accessory: 'none',
  color: 'brown',
})

// Initialize from existing character data if available
onMounted(() => {
  const currentCharacter = characterStore.currentCharacter
  if (currentCharacter?.hair) {
    selectedHair.value = { ...currentCharacter.hair }
  }
})

// Update hair property
const updateHair = (
  characterId: string,
  property: keyof typeof selectedHair.value,
  value: string,
) => {
  selectedHair.value[property] = value
  if (characterStore.currentCharacter) {
    characterStore.updateCharacterFeature('hair', { ...selectedHair.value })
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

.head-with-hair {
  position: relative;
  display: inline-block;
}

.hair {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
}

.accessory {
  position: absolute;
  top: -20px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 24px;
}
</style>
