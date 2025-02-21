<template>
  <div class="character-list">
    <div v-if="characters.length === 0" class="empty-state">
      <p>No characters created yet</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="character in characters" :key="character.id" class="character-card">
        <CharacterPreview :character="character" />
        <div class="actions">
          <button 
            @click="$emit('edit', character.id)"
            class="edit-btn"
          >
            Edit
          </button>
          <button 
            @click="$emit('delete', character.id)"
            class="delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Character } from '@/types/character'
import CharacterPreview from './CharacterPreview.vue'

defineProps<{
  characters: Character[]
}>()

defineEmits<{
  (e: 'edit', id: string): void
  (e: 'delete', id: string): void
}>()
</script>

<style scoped lang="scss">
.character-list {
  width: 100%;
  
  .empty-state {
    text-align: center;
    padding: 2rem;
    color: #666;
  }

  .character-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    
    .actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      
      button {
        flex: 1;
        padding: 0.5rem;
        border-radius: 4px;
        
        &.edit-btn {
          background: #4CAF50;
          color: white;
        }
        
        &.delete-btn {
          background: #f44336;
          color: white;
        }
      }
    }
  }
}
</style>
