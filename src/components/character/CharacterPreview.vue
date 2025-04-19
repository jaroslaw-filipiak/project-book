<template>
  <div class="character-preview" :style="{ transform: `scale(${scale})` }">
    <!-- Character preview with layered SVG elements -->
    <div v-if="character" class="character-container relative">
      <!-- Head shape layer -->
      <div v-if="character.head" class="head-layer" v-html="character.head?.svg"></div>

      <!-- Face expression layer (from /face folder) -->
      <div v-if="character.face" class="face-layer" v-html="character.face?.svg"></div>

      <!-- Legacy support for individual facial features -->
      <div
        v-if="character.eyes && !character.face"
        class="eyes-layer absolute"
        style="top: 40%; left: 50%; transform: translate(-50%, -50%); z-index: 5"
        v-html="character.eyes?.svg"
      ></div>

      <div
        v-if="character.nose && !character.face"
        class="nose-layer absolute"
        style="top: 55%; left: 50%; transform: translate(-50%, -50%); z-index: 5"
        v-html="character.nose?.svg"
      ></div>

      <div
        v-if="character.mouth && !character.face"
        class="mouth-layer absolute"
        style="top: 70%; left: 50%; transform: translate(-50%, -50%); z-index: 5"
        v-html="character.mouth?.svg"
      ></div>

      <!-- Facial Hair layer -->
      <div
        v-if="character.facialHair"
        class="facial-hair-layer"
        v-html="character.facialHair?.svg"
      ></div>

      <!-- Hair layer (kept for backward compatibility) -->
      <div v-if="character.hair" class="hair-layer absolutez-20" v-html="character.hair?.svg"></div>

      <!-- Accessories layers (now multiple) -->
      <template v-if="character.accessories && character.accessories.length > 0">
        <div
          v-for="accessory in character.accessories"
          :key="accessory.id"
          class="accessory-layer absolute z-30"
          v-html="accessory.svg"
        ></div>
      </template>
    </div>

    <!-- Placeholder when no character data -->
    <div
      v-else
      class="placeholder-character bg-gray-200 rounded-full h-24 w-24 flex items-center justify-center"
    >
      <span class="text-gray-400">?</span>
    </div>

    <!-- Body part (separate from head) -->
    <div
      v-if="character && character.body"
      class="body-layer mt-2"
      v-html="character.body?.svg"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Character } from '@/types/book'

// Component props
const props = defineProps<{
  character?: Character
  scale?: number
}>()

// Default scale if not provided
const scale = props.scale || 1
</script>

<style scoped>
.character-container {
  @apply w-full aspect-square;
}

.head-layer {
  @apply absolute scale-50 origin-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5;
}

.face-layer {
  @apply absolute scale-50 origin-center left-[53%] top-[54%] transform -translate-x-1/2 -translate-y-1/2 z-20;
}

.facial-hair-layer {
  @apply absolute scale-50 origin-bottom left-[51%] top-[47%] transform -translate-x-1/2 -translate-y-1/2 z-10;
}

.accessory-layer {
  @apply absolute scale-50 origin-center left-[47%] top-[51%] transform -translate-x-1/2 -translate-y-1/2 z-5;
}
</style>
