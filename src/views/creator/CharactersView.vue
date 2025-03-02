<template>
  <div class="characters-view container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6" v-if="!isAnyCharacterBeingCreated">
      Stwórz bohaterów do swojej książki
    </h1>

    <CreatorNavigation v-if="!isAnyCharacterBeingCreated" currentStep="postacie" />

    <!-- Character creation interface -->
    <div class="characters-container">
      <!-- all characters created -->
      <div
        v-if="characterStore.areAllCharactersComplete && !isAnyCharacterBeingCreated"
        class="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg"
      >
        <h2 class="text-2xl font-bold mb-4 text-green-700">Wszystkie postacie utworzone!</h2>
        <p class="text-gray-600 mb-4">
          Stworzyłeś wszystkie {{ characterStore.MAX_CHARACTERS }} postacie. Możesz teraz przejść do
          tworzenia historii.
        </p>
        <button
          @click="navigateNext"
          class="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Przejdź do tworzenia historii
        </button>
      </div>

      <!-- no characters created -->
      <div v-else-if="completedCharacters.length === 0 && !isAnyCharacterBeingCreated" class="mb-6">
        <p class="text-gray-600">Utwórz {{ characterStore.MAX_CHARACTERS }} postacie</p>
      </div>

      <!-- is one character created but not all -->
      <div
        v-else-if="
          completedCharacters.length > 0 &&
          !characterStore.areAllCharactersComplete &&
          !isAnyCharacterBeingCreated
        "
        class="mb-6"
      >
        <h2 class="text-2xl font-bold mb-4">
          Brawo! utworzyłeś już {{ completedCharacters.length }}
          {{ completedCharacters.length === 1 ? 'postać' : 'postacie' }}
        </h2>
        <p class="text-gray-600">
          Ilość postaci pozostała do utworzenia:
          {{ characterStore.MAX_CHARACTERS - completedCharacters.length }}
        </p>
      </div>

      <!-- Character slots grid with completed characters and next form -->
      <div
        v-if="!isAnyCharacterBeingCreated"
        class="character-slots grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
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
          v-if="characterStore.characters.length < characterStore.MAX_CHARACTERS"
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
                  <label class="block text-sm font-medium mb-1">Płeć</label>
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
            {{ characterStore.isEditing ? 'Edytowanie' : 'Tworzenie' }} postaci:
            {{ characterStore.currentCharacter?.name }}
          </h3>
          <button @click="cancelCharacterCreation" class="px-3 py-1 border rounded">Anuluj</button>
        </div>
        <CharacterCreator
          @character-completed="handleCharacterCompleted"
          @cancel="cancelCharacterCreation"
        />
      </div>

      <!-- Navigation has been moved to the success message box above -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCharacterStore } from '@/stores/character'
import { useBookStore } from '@/stores/book'
import CharacterCreator from '@/components/character/CharacterCreator.vue'
import CharacterPreview from '@/components/character/CharacterPreview.vue'
import CreatorNavigation from '@/components/book/CreatorNavigation.vue'

const router = useRouter()
const bookStore = useBookStore()
const characterStore = useCharacterStore()

const newCharacterName = ref('')
const newCharacterGender = ref('')

// Compute if a character is being created/edited
const isAnyCharacterBeingCreated = computed(() => characterStore.currentCharacterId !== null)

// Get only the completed characters
const completedCharacters = computed(() =>
  characterStore.characters.filter((char) => char.isComplete),
)

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
  // Just reset the character creation state, never auto-navigate
  characterStore.resetCreation()
}

// Cancel character creation
const cancelCharacterCreation = () => {
  characterStore.resetCreation()
}

// Navigation to next step
const navigateNext = () => {
  if (characterStore.areAllCharactersComplete) {
    router.push('/kreator/historia')
  }
}

// Check if stories are complete
const areAllStoriesComplete = computed(() => {
  return (
    characterStore.characters.length > 0 &&
    characterStore.characters.every((char) => bookStore.isCharacterStoryComplete(char.id))
  )
})

// Check if book is complete
const isBookComplete = computed(() => {
  return (
    bookStore.pages.length === bookStore.maxPages &&
    bookStore.pages.every((page) => page && page.templateId)
  )
})

// Navigate if conditions are met
const navigateIfReady = (path: string, isReady: boolean) => {
  if (isReady) {
    router.push(path)
  }
}
</script>

<style scoped>
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

.step-tab {
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
}

.step-tab.router-link-active {
  color: #2b6cb0;
  border-bottom-color: #2b6cb0;
}
</style>
