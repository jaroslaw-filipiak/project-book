<template>
  <div class="character-preview" :style="{ transform: `scale(${scale})` }">
    <!-- Character preview with layered SVG elements -->
    <div v-if="character" class="character-container">
      <!-- Head shape layer (previously face) -->
      <div
        v-if="character.head"
        class="head-layer scale-50 origin-center"
        v-html="character.head?.svg"
      ></div>

      <!-- Eyes layer -->
      <div
        v-if="character.eyes"
        class="eyes-layer absolute"
        style="top: 40%; left: 50%; transform: translate(-50%, -50%)"
        v-html="character.eyes?.svg"
      ></div>

      <!-- Nose layer -->
      <div
        v-if="character.nose"
        class="nose-layer absolute"
        style="top: 55%; left: 50%; transform: translate(-50%, -50%)"
        v-html="character.nose?.svg"
      ></div>

      <!-- Mouth layer -->
      <div
        v-if="character.mouth"
        class="mouth-layer absolute"
        style="top: 70%; left: 50%; transform: translate(-50%, -50%)"
        v-html="character.mouth?.svg"
      ></div>

      <!-- Facial Hair layer -->
      <div
        v-if="character.facialHair"
        class="facial-hair-layer absolute"
        style="top: 75%; left: 50%; transform: translate(-50%, -50%)"
        v-html="character.facialHair?.svg"
      ></div>

      <!-- Hair layer (kept for backward compatibility) -->
      <div
        v-if="character.hair"
        class="hair-layer absolute inset-0"
        v-html="character.hair?.svg"
      ></div>

      <!-- Accessories layers (now multiple) -->
      <template v-if="character.accessories && character.accessories.length > 0">
        <div
          v-for="accessory in character.accessories"
          :key="accessory.id"
          class="accessory-layer absolute inset-0"
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

<style scoped></style>
