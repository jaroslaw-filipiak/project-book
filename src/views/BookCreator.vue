<template>
  <div class="book-creator container">
    <div class="steps">
      <CharacterCreator v-if="bookStore.currentStep === 1" />
      <PageEditor v-if="bookStore.currentStep === 2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterCreator from '@/components/character/CharacterCreator.vue'
import PageEditor from '@/components/book/PageEditor.vue'

import { useBookStore } from '@/stores/book'
import { useCharacterStore } from '@/stores/characters'

const bookStore = useBookStore()
const characterStore = useCharacterStore()
</script>
