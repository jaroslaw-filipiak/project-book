<template>
  <div class="book-creator container">
    <div class="steps">
      <div v-if="bookStore.currentStep === 1">
        <div class="container mx-auto p-4">
          <div class="flex flex-col items-center gap-8">
            <!-- CharacterPreview -->
            <!-- <CharacterPreview :character="characterStore.currentCharacter" /> -->

            <!-- Creation/Edition steps -->
            <div class="flex-1">
              <!-- Basic Info Step or Create Another Character button -->
              <div v-if="characterStore.currentStep === 1" class="border rounded-lg p-6">
                <div
                  v-if="
                    !characterStore.isEditing &&
                    characterStore.characters.length > 0 &&
                    !showCreateForm
                  "
                  class="text-center"
                >
                  <div v-if="characterStore.characters.length === characterStore.MAX_CHARACTERS">
                    Gratulacje! Utworzyłeś wszystkich bohaterów
                  </div>

                  <div v-else>
                    <button
                      @click="startNewCharacter"
                      class="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Stwórz kolejnego bohatera
                    </button>
                  </div>
                </div>

                <div v-else>
                  <h3 class="text-center text-4xl mb-10">
                    {{ characterStore.isEditing ? 'Edytuj bohatera' : 'Krok 1 - Stwórz bohatera' }}
                  </h3>

                  <div class="max-w-md mx-auto">
                    <form @submit.prevent="handleBasicInfo" class="space-y-6">
                      <div class="form-group">
                        <label class="block text-sm font-medium mb-2">Imię</label>
                        <input
                          v-model="name"
                          type="text"
                          required
                          class="w-full p-2 border rounded"
                        />
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
              <div
                v-for="character in characterStore.characters"
                :key="character.id"
                class="relative"
              >
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
          <!-- Character list END -->
        </div>
      </div>
      <StoryPreparation v-if="bookStore.currentStep === 2" />
      <PageEditor v-if="bookStore.currentStep === 3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CharacterPreview from '@/components/character/CharacterPreview.vue'
import BodyEditor from '@/components/character/steps/BodyEditor.vue'
import FaceEditor from '@/components/character/steps/FaceEditor.vue'
import HairEditor from '@/components/character/steps/HairEditor.vue'
import StoryPreparation from '@/components/story/StoryPreparation.vue'
import PageEditor from '@/components/book/PageEditor.vue'

import { useBookStore } from '@/stores/book'
import { useCharacterStore } from '@/stores/characters'

const bookStore = useBookStore()
const characterStore = useCharacterStore()

const name = ref('')
const sex = ref('')

// Initialize form if editing
if (characterStore.isEditing && characterStore.currentCharacter) {
  name.value = characterStore.currentCharacter.name
  sex.value = characterStore.currentCharacter.sex
}

const isBasicInfoValid = computed(() => name.value.trim() && sex.value)

const handleBasicInfo = () => {
  if (!isBasicInfoValid.value) return

  if (
    characterStore.characters.length >= characterStore.MAX_CHARACTERS &&
    !characterStore.isEditing
  ) {
    alert(`You can only create up to ${characterStore.MAX_CHARACTERS} characters`)
    return
  }

  if (!characterStore.isEditing) {
    characterStore.createCharacter(name.value.trim(), sex.value as 'male' | 'female')
  }

  characterStore.nextStep()
}

const showCreateForm = ref(false)

const startNewCharacter = () => {
  name.value = ''
  sex.value = ''
  characterStore.resetCreation()
  showCreateForm.value = true
}

const finishCharacter = () => {
  if (characterStore.currentCharacter) {
    characterStore.updateCharacter(characterStore.currentCharacter.id, {
      isComplete: true,
    })
    characterStore.resetCreation()

    // If we have max characters, move to story preparation
    if (characterStore.characters.length >= characterStore.MAX_CHARACTERS) {
      bookStore.nextStep()
    }
  }
}
</script>
