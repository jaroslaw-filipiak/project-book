
<template>
  <div class="character-manager">
    <div v-if="!isCreating" class="mb-8">
      <CharacterList 
        :characters="characters"
        @edit="startEditing"
        @delete="deleteCharacter"
      />
      <button 
        @click="startCreating"
        class="create-btn mt-4"
      >
        Create New Character
      </button>
    </div>

    <CharacterCreator
      v-else
      @character-created="handleCharacterCreated"
      @cancel="isCreating = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Character } from '@/types/character'
import CharacterList from './CharacterList.vue'
import CharacterCreator from './CharacterCreator.vue'

const props = defineProps<{
  characters: Character[]
}>()

const emit = defineEmits<{
  (e: 'character-created', character: Character): void
  (e: 'character-updated', character: Character): void
  (e: 'character-deleted', id: string): void
  (e: 'max-characters-reached'): void
}>()

const isCreating = ref(false)

const characterStore = useCharacterStore()

const startCreating = () => {
  if (props.characters.length >= characterStore.MAX_CHARACTERS) {
    // Emit event to parent to switch to book creation
    emit('max-characters-reached')
    return
  }
  isCreating.value = true
}

const startEditing = (id: string) => {
  const character = props.characters.find(c => c.id === id)
  if (character) {
    isCreating.value = true
    // TODO: Pass editing state to CharacterCreator
  }
}

const handleCharacterCreated = (character: Character) => {
  emit('character-created', character)
  isCreating.value = false
}

const deleteCharacter = (id: string) => {
  if (confirm('Are you sure you want to delete this character?')) {
    emit('character-deleted', id)
  }
}
</script>

<style scoped lang="scss">
.character-manager {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  
  .create-btn {
    width: 100%;
    padding: 1rem;
    background: #42b883;
    color: white;
    border-radius: 8px;
    font-weight: bold;
    
    &:hover {
      background: #3aa876;
    }
  }
}
</style>
