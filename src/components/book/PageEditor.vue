<template>
  <div class="page-editor">
    <div class="editor-header">
      <button class="back-btn" @click="bookStore.prevStep">
        Back to Characters
      </button>
    </div>
    <div class="template-selector">page editor</div>
  </div>
</template>

<script setup lang="ts">
import { useBookStore } from '@/stores/book'

const bookStore = useBookStore()
</script>

<style scoped>
.editor-header {
  padding: 1rem;
}

.back-btn {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #e0e0e0;
}
</style>
