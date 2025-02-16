<!-- components/book/PagePreview.vue -->
<template>
  <div class="page-preview" :style="pageStyle">
    <!-- Template background -->
    <div class="template-background">
      <component :is="templateComponent" v-if="templateComponent" />
    </div>

    <!-- Character -->
    <div class="character" v-if="characterSvg" :style="characterStyle" v-html="characterSvg" />

    <!-- Text elements -->
    <div
      v-for="(text, id) in content.text"
      :key="id"
      :class="['text-element', `text-${id}`]"
      :style="getTextStyle(id)"
    >
      {{ text }}
    </div>

    <!-- Selected options -->
    <div v-if="content.options.length" class="options-display">
      <span v-for="option in content.options" :key="option" class="option-tag">
        {{ getOptionText(option) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBookStore } from '@/stores/book'

const props = defineProps<{
  template: string
  content: {
    text: Record<string, string>
    options: string[]
    characterPose: string
  }
  characters: any[]
}>()

const bookStore = useBookStore()

const templateComponent = computed(() => {
  // Dynamic import of template SVG component
  return bookStore.getTemplateComponent(props.template)
})

const characterSvg = computed(() => {
  if (!props.characters.length) return null
  return bookStore.getCharacterSvg(props.characters[0].id, props.content.characterPose)
})

const pageStyle = computed(() => ({
  width: '600px',
  height: '800px',
  position: 'relative',
}))

const characterStyle = computed(() => {
  const template = bookStore.getTemplate(props.template)
  return {
    position: 'absolute',
    ...template.characterPosition,
  }
})

const getTextStyle = (textId: string) => {
  const template = bookStore.getTemplate(props.template)
  return template.textPositions[textId]
}

const getOptionText = (optionId: string) => {
  const template = bookStore.getTemplate(props.template)
  return template.options.find((opt) => opt.id === optionId)?.text || ''
}
</script>

<style scoped lang="scss">
.page-preview {
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .text-element {
    position: absolute;
    font-family: var(--book-font);
  }

  .options-display {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    .option-tag {
      background: #42b883;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }
  }
}
</style>
