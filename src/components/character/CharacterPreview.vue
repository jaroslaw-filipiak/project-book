<template>
  <div class="character-preview">
    <div class="preview-container">
      <div v-if="!character" class="placeholder">
        <span>No character selected</span>
      </div>
      <div v-else class="character-layers">
        <!-- <div class="layer body" v-if="character.body" v-html="renderBody"></div>
        <div class="layer face" v-if="character.face" v-html="renderFace"></div>
        <div class="layer hair" v-if="character.hair" v-html="renderHair"></div> -->
      </div>
    </div>

    <!-- <div v-if="character" class="character-info">
      <h3>{{ character.name }}</h3>
      <span class="gender-badge" :class="character.sex">
        {{ character.sex === 'male' ? 'Chłopiec' : 'Dziewczynka' }}
      </span>
      <div v-if="character.isComplete" class="complete-badge">✓ Complete</div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Character } from '@/types/character'

import { useCharacterStore } from '@/stores/character'

const characterStore = useCharacterStore()

const props = defineProps<{
  character?: Character
}>()

// const renderBody = computed(() => {
//   if (!props.character?.body) return ''
//   return characterStore.getCharacterBodySvg(props.character.body)
// })

// const renderFace = computed(() => {
//   if (!props.character?.face) return ''
//   return characterStore.getCharacterFaceSvg(props.character.face)
// })

// const renderHair = computed(() => {
//   if (!props.character?.hair) return ''
//   return characterStore.getCharacterHairSvg(props.character.hair)
// })
</script>

<style scoped lang="scss">
.character-preview {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .preview-container {
    aspect-ratio: 1;
    background: #f5f5f5;
    position: relative;
    overflow: hidden;

    .placeholder {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 0.875rem;
    }

    .character-layers {
      position: relative;
      height: 100%;

      .layer {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        :deep(svg) {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .character-info {
    padding: 1rem;

    h3 {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .gender-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 999px;
      font-size: 0.75rem;

      &.male {
        background: #e3f2fd;
        color: #1976d2;
      }

      &.female {
        background: #fce4ec;
        color: #c2185b;
      }
    }

    .complete-badge {
      margin-top: 0.5rem;
      color: #4caf50;
      font-size: 0.875rem;
    }
  }
}
</style>
