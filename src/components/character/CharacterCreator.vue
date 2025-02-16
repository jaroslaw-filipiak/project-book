<template>
  <div class="character-creator container flex gap-4 pt-10">
    <div class="steps">
      <BasicInfo v-if="characterStore.currentStep === 1" />
      <BodyEditor v-if="characterStore.currentStep === 2" />
      <FaceEditor v-if="characterStore.currentStep === 3" />
      <HairEditor v-if="characterStore.currentStep === 4" />
    </div>

    <!-- <div class="preview w-full md:w-6/12 aspect-square border">preview</div>
    <div class="controls w-full md:w-6/12 aspect-square border">controls</div> -->
  </div>
</template>

<script setup lang="ts">
import BasicInfo from './steps/BasicInfo.vue'
import BodyEditor from './steps/BodyEditor.vue'
import FaceEditor from './steps/FaceEditor.vue'
import HairEditor from './steps/HairEditor.vue'

import { useCharacterStore } from '@/stores/characters'
const characterStore = useCharacterStore()
</script>

<style scoped></style>
