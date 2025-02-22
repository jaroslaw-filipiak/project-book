<template>
  <div class="container mx-auto p-4">
    <div class="flex flex-col items-center gap-8">
      <!-- CharacterPreview -->
      <CharacterPreview :character="characterStore.currentCharacter" />

      <!-- Creation/Edition steps -->
      <div class="flex-1">
        <!-- Info message when character is complete -->
        <div v-if="characterStore.characters.length >= characterStore.MAX_CHARACTERS && 
                   characterStore.characters.every(char => char.isComplete) && 
                   !characterStore.isEditing" 
             class="border rounded-lg p-6 text-center">
          <h3 class="text-center text-4xl mb-6">Characters Complete!</h3>
          <p class="text-gray-600 mb-6">Your character is ready for the story!</p>
          <button 
            @click="() => { bookStore.nextStep() }"
            class="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Continue to Story Creation
          </button>
        </div>

        <!-- Basic Info Step -->
        <div v-else-if="characterStore.currentStep === 1" class="border rounded-lg p-6">
          <h3 class="text-center text-4xl mb-10">
            {{ characterStore.isEditing ? 'Edytuj bohatera' : 'Krok 1 - Stwórz bohatera' }}
          </h3>

          <div class="max-w-md mx-auto">
            <form @submit.prevent="handleBasicInfo" class="space-y-6">
              <div class="form-group">
                <label class="block text-sm font-medium mb-2">Imię</label>
                <input v-model="name" type="text" required class="w-full p-2 border rounded" />
              </div>

              <div class="form-group">
                <label class="block text-sm font-medium mb-2">Płeć</label>
                <select
                  v-model="sex"
                  required
                  class="w-full p-2 border rounded"
                  :disabled="characterStore.isEditing"
                >
                  <option value="">Wybierz płeć</option>
                  <option value="male">Chłopiec</option>
                  <option value="female">Dziewczynka</option>
                </select>
              </div>

              <button
                type="submit"
                class="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                :disabled="!isBasicInfoValid"
              >
                {{ characterStore.isEditing ? 'Zapisz zmiany' : 'Stwórz postać' }}
              </button>
            </form>
          </div>
        </div>

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

          <button 
            v-if="characterStore.characters.length < characterStore.MAX_CHARACTERS"
            @click="characterStore.resetCreation" 
            class="w-full p-2 border rounded"
          >
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
import { ref, computed } from 'vue'
import { useCharacterStore } from '@/stores/characters'
import { useBookStore } from '@/stores/book'
const bookStore = useBookStore()
import CharacterPreview from './CharacterPreview.vue'
import BodyEditor from './steps/BodyEditor.vue'
import FaceEditor from './steps/FaceEditor.vue'
import HairEditor from './steps/HairEditor.vue'

const characterStore = useCharacterStore()
const name = computed({
  get: () => characterStore.currentCharacter?.name || '',
  set: (value) => {
    if (characterStore.currentCharacter) {
      characterStore.updateCharacter(characterStore.currentCharacter.id, {
        name: value.trim()
      })
    }
  }
})

const sex = computed({
  get: () => characterStore.currentCharacter?.sex || '',
  set: (value) => {
    if (characterStore.currentCharacter) {
      characterStore.updateCharacter(characterStore.currentCharacter.id, {
        sex: value as 'male' | 'female'
      })
    }
  }
})

const isBasicInfoValid = computed(() => name.value.trim() && sex.value)

const handleBasicInfo = () => {
  if (!isBasicInfoValid.value) return

  if (characterStore.characters.length >= characterStore.MAX_CHARACTERS && !characterStore.isEditing) {
    alert(`You can only create up to ${characterStore.MAX_CHARACTERS} characters`)
    return
  }

  if (!characterStore.isEditing) {
    characterStore.createCharacter(name.value.trim(), sex.value as 'male' | 'female')
  }
  
  characterStore.nextStep()
}

const finishCharacter = () => {
  if (characterStore.currentCharacter) {
    characterStore.updateCharacter(characterStore.currentCharacter.id, {
      isComplete: true,
    })
    characterStore.resetCreation()
    
    // If we have max characters, set book store step to 2 (page editor)
    if (characterStore.characters.length >= characterStore.MAX_CHARACTERS) {
      const bookStore = useBookStore()
      bookStore.currentStep = 2
    }
  }
}
</script>
