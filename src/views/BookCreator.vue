<template>
  <div class="book-creator container">
    <div class="steps">
      <CharacterCreator v-if="bookStore.currentStep === 1" />
      <StoryPreparation v-if="bookStore.currentStep === 2" />
      <PageEditor v-if="bookStore.currentStep === 3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterCreator from '@/components/character/CharacterCreator.vue'
import StoryPreparation from '@/components/story/StoryPreparation.vue'
import PageEditor from '@/components/book/PageEditor.vue'

import { useBookStore } from '@/stores/book'
import { useCharacterStore } from '@/stores/characters'

const bookStore = useBookStore()
const characterStore = useCharacterStore()
</script>
