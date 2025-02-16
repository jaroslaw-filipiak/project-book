<!-- components/book/BookPreview.vue -->
<template>
    <div class="book-preview">
      <div class="toolbar">
        <button @click="previousPage" :disabled="currentPage === 0">
          Previous Page
        </button>
        <span>Page {{ currentPage + 1 }} of {{ pages.length }}</span>
        <button @click="nextPage" :disabled="currentPage === pages.length - 1">
          Next Page
        </button>
      </div>

      <div class="pages-grid" v-if="showGrid">
        <div
          v-for="(page, index) in pages"
          :key="index"
          class="page-thumbnail"
          @click="selectPage(index)"
        >
          <PagePreview
            :template="page.templateId"
            :content="page.content"
            :characters="characters"
            :scale="0.3"
          />
          <div class="page-overlay">
            <button @click.stop="editPage(index)">Edit</button>
          </div>
        </div>
      </div>

      <div class="single-page-view" v-else>
        <PagePreview
          :template="currentPageData.templateId"
          :content="currentPageData.content"
          :characters="characters"
        />
      </div>

      <div class="view-controls">
        <button @click="toggleView">
          {{ showGrid ? 'Single Page View' : 'Grid View' }}
        </button>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useBookStore } from '@/stores/book'
  import PagePreview from './PagePreview.vue'

  const props = defineProps<{
    pages: any[]
  }>()

  const emit = defineEmits<{
    'edit-page': [index: number]
  }>()

  const showGrid = ref(true)
  const currentPage = ref(0)

  const bookStore = useBookStore()
  const characters = computed(() => bookStore.characters)

  const currentPageData = computed(() => props.pages[currentPage.value])

  const toggleView = () => {
    showGrid.value = !showGrid.value
  }

  const selectPage = (index: number) => {
    currentPage.value = index
    showGrid.value = false
  }

  const editPage = (index: number) => {
    emit('edit-page', index)
  }

  const previousPage =
