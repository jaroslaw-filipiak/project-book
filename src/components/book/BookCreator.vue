<template>
  <div class="book-creator container mx-auto p-4">
    <!-- Main navigation steps -->
    <div class="book-steps mb-8">
      <div class="flex justify-between border-b">
        <div
          v-for="(step, index) in mainSteps"
          :key="index"
          :class="['step-tab px-6 py-3', { active: bookStore.currentStep === index + 1 }]"
          @click="setMainStep(index + 1)"
        >
          {{ step }}
        </div>
      </div>
    </div>

    <!-- Step 1: Character Creation -->
    <div v-if="bookStore.currentStep === 1">
      <!-- no characters created -->
      <div v-if="completedCharacters.length === 0" class="mb-6">
        <h2 class="text-2xl font-bold mb-4">Stwórz bohaterów do swojej książki</h2>
        <p class="text-gray-600">Utwórz {{ characterStore.MAX_CHARACTERS }} postacie</p>
      </div>

      <!-- is one character created -->
      <div v-if="completedCharacters.length === 1" class="mb-6">
        <h2 class="text-2xl font-bold mb-4">
          Brawo! utworzyłeś już {{ completedCharacters.length }} postać ({{
            characterStore.characters[0].name
          }}
          )
        </h2>
        <p class="text-gray-600">
          Ilość postaci pozostała do utworzenia:
          {{ characterStore.MAX_CHARACTERS - completedCharacters.length }}
        </p>
      </div>

      <!-- Character slots grid with completed characters and next form -->
      <div class="character-slots grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Display completed characters first -->
        <div
          v-for="character in completedCharacters"
          :key="character.id"
          class="character-slot border rounded-lg p-4"
        >
          <div class="character-card">
            <CharacterPreview :character="character" />
            <div class="actions mt-4 flex gap-2">
              <button
                @click="editCharacter(character.id)"
                class="flex-1 p-2 bg-blue-100 text-blue-700 rounded"
              >
                Edytuj
              </button>
              <button
                @click="deleteCharacter(character.id)"
                class="flex-1 p-2 bg-red-100 text-red-700 rounded"
              >
                Usuń
              </button>
            </div>
          </div>
        </div>

        <!-- Show a form to create the next character if we haven't reached MAX_CHARACTERS -->
        <div
          v-if="
            characterStore.characters.length < characterStore.MAX_CHARACTERS &&
            !isAnyCharacterBeingCreated
          "
          class="character-slot border rounded-lg p-4"
        >
          <div class="empty-slot p-4 h-64">
            <div class="character-form">
              <h3 class="text-lg font-medium mb-4">
                Stwórz {{ characterStore.characters.length + 1 }}-ego bohatera
              </h3>
              <form @submit.prevent="createNextCharacter">
                <div class="mb-4">
                  <label class="block text-sm font-medium mb-1">Imię</label>
                  <input
                    v-model="newCharacterName"
                    type="text"
                    required
                    class="w-full p-2 border rounded"
                    placeholder="Wpisz imię"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-medium mb-1">Gender</label>
                  <select v-model="newCharacterGender" required class="w-full p-2 border rounded">
                    <option value="">Wybierz płeć</option>
                    <option value="male">Chłopiec</option>
                    <option value="female">Dziewczynka</option>
                  </select>
                </div>
                <button
                  type="submit"
                  class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  :disabled="!newCharacterName || !newCharacterGender"
                >
                  Stwórz bohatera
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Character creator for detailing a character -->
      <div v-if="isAnyCharacterBeingCreated" class="w-full">
        <div class="mb-4 flex justify-between items-center">
          <h3 class="text-xl font-bold">
            {{ characterStore.isEditing ? 'Editing' : 'Creating' }} Character:
            {{ characterStore.currentCharacter?.name }}
          </h3>
          <button @click="cancelCharacterCreation" class="px-3 py-1 border rounded">Cancel</button>
        </div>
        <CharacterCreator
          @character-completed="handleCharacterCompleted"
          @cancel="cancelCharacterCreation"
        />
      </div>

      <!-- Navigation -->
      <div class="navigation mt-6 flex justify-between">
        <div></div>
        <button
          v-if="!isAnyCharacterBeingCreated && characterStore.areAllCharactersComplete"
          @click="bookStore.nextStep"
          class="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Continue to Story
        </button>
      </div>
    </div>

    <!-- Step 2: Story Customization -->
    <div v-if="bookStore.currentStep === 2">
      <StoryPreparation />
    </div>

    <!-- Step 3: Page Editor -->
    <div v-if="bookStore.currentStep === 3">
      <PageEditor />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBookStore } from '@/stores/book'
import { useCharacterStore } from '@/stores/character'
import CharacterCreator from '@/components/character/CharacterCreator.vue'
import CharacterPreview from '@/components/character/CharacterPreview.vue'
import StoryPreparation from '@/components/story/StoryPreparation.vue'
import PageEditor from '@/components/book/PageEditor.vue'

const bookStore = useBookStore()
const characterStore = useCharacterStore()

const mainSteps = ['Characters', 'Story', 'Pages']
const newCharacterName = ref('')
const newCharacterGender = ref('')

// Compute if a character is being created/edited
const isAnyCharacterBeingCreated = computed(() => characterStore.currentCharacterId !== null)

// Get only the completed characters
const completedCharacters = computed(() =>
  characterStore.characters.filter((char) => char.isComplete),
)

// Set main step if conditions are met
const setMainStep = (step: number) => {
  // Only allow navigation to steps that are valid
  if (
    step === 1 ||
    (step === 2 && characterStore.areAllCharactersComplete) ||
    (step === 3 && bookStore.areAllStoriesComplete())
  ) {
    bookStore.currentStep = step
  }
}

// Create the next character
const createNextCharacter = () => {
  if (!newCharacterName.value || !newCharacterGender.value) return

  // Create the character in the store
  characterStore.createCharacter(
    newCharacterName.value,
    newCharacterGender.value as 'male' | 'female',
  )

  // Reset form fields
  newCharacterName.value = ''
  newCharacterGender.value = ''
}

// Edit an existing character
const editCharacter = (characterId: string) => {
  characterStore.startEditing(characterId)
}

// Delete a character
const deleteCharacter = (characterId: string) => {
  if (confirm('Are you sure you want to delete this character?')) {
    characterStore.removeCharacter(characterId)
  }
}

// Handle when a character is completed
const handleCharacterCompleted = () => {
  // Reset the character creation state
  characterStore.resetCreation()

  // If all characters are created, go to next step
  if (characterStore.areAllCharactersComplete) {
    setTimeout(() => {
      bookStore.nextStep()
    }, 500)
  }
}

// Cancel character creation
const cancelCharacterCreation = () => {
  characterStore.resetCreation()
}
</script>

<style scoped>
.book-steps {
  border-bottom: 1px solid #e2e8f0;
}

.step-tab {
  cursor: pointer;
  font-weight: 500;
  color: #718096;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
}

.step-tab.active {
  color: #2b6cb0;
  border-bottom-color: #2b6cb0;
}

.character-slot {
  min-height: 250px;
  display: flex;
  flex-direction: column;
}

.empty-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
