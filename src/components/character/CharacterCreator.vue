<template>
  <div class="container mx-auto p-4">
    <div class="flex flex-col items-center gap-8">
      <!-- CharacterPreview -->
      <CharacterPreview :character="characterStore.currentCharacter" />

      <!-- Creation/Edition steps -->
      <div class="flex-1">
        <BasicInfo v-if="characterStore.currentStep === 1" />
        <BodyEditor v-if="characterStore.currentStep === 2" />
        <FaceEditor v-if="characterStore.currentStep === 3" />
        <HairEditor v-if="characterStore.currentStep === 4" />
      </div>

      <!-- Preview and navigation -->
      <div class="w-64">
        <div class="mt-4 space-y-2" v-if="characterStore.currentCharacter">
          <button
            @click="characterStore.previousStep"
            class="w-full p-2 border rounded"
            :disabled="characterStore.currentStep === 1"
          >
            Previous Step
          </button>

          <button
            v-if="characterStore.currentStep < 4"
            @click="characterStore.nextStep"
            class="w-full p-2 border rounded bg-blue-500 text-white"
          >
            Next Step
          </button>

          <button
            v-else
            @click="finishCharacter"
            class="w-full p-2 border rounded bg-green-500 text-white"
          >
            {{ characterStore.isEditing ? 'Save Changes' : 'Finish Character' }}
          </button>

          <button @click="characterStore.resetCreation" class="w-full p-2 border rounded">
            Create Another Character
          </button>
        </div>
      </div>
    </div>

    <!-- Character list -->
    <div class="mt-8" v-if="characterStore.characters.length > 0">
      <h3 class="text-xl font-bold mb-4">Created Characters</h3>
      <div class="flex gap-4 flex-wrap">
        <div v-for="character in characterStore.characters" :key="character.id" class="relative">
          <CharacterPreview :character="character" />
          <button
            @click="characterStore.startEditing(character.id)"
            class="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <span class="sr-only">Edit</span>
            ✏️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '@/stores/characters'
import CharacterPreview from './CharacterPreview.vue'
import BasicInfo from './steps/BasicInfo.vue'
import BodyEditor from './steps/BodyEditor.vue'
import FaceEditor from './steps/FaceEditor.vue'
import HairEditor from './steps/HairEditor.vue'

const characterStore = useCharacterStore()

const finishCharacter = () => {
  if (characterStore.currentCharacter) {
    characterStore.updateCharacter(characterStore.currentCharacter.id, {
      isComplete: true,
    })
    characterStore.resetCreation()
  }
}
</script>
