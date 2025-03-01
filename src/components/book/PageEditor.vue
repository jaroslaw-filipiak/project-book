<template>
  <div class="page-editor">
    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-4">Design Your Book Pages</h2>
      <p class="text-gray-600">Customize each page of your book.</p>
    </div>

    <!-- Page navigation -->
    <div class="page-nav mb-6 flex items-center justify-between">
      <button @click="prevPage" class="px-4 py-2 border rounded" :disabled="currentPageIndex === 0">
        Previous Page
      </button>

      <div class="page-indicator">Page {{ currentPageIndex + 1 }} of {{ maxPages }}</div>

      <button
        @click="nextPage"
        class="px-4 py-2 border rounded"
        :disabled="currentPageIndex === maxPages - 1"
      >
        Next Page
      </button>
    </div>

    <!-- Page design area -->
    <div class="page-design grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left: Page settings -->
      <div class="page-settings border rounded-lg p-6">
        <h3 class="text-xl font-bold mb-4">Page Settings</h3>

        <!-- Template selection -->
        <div class="form-group mb-6">
          <label class="block text-sm font-medium mb-2">Page Template</label>
          <select
            v-model="currentPage.templateId"
            class="w-full p-2 border rounded"
            @change="updateCurrentPage"
          >
            <option value="">Select a template</option>
            <option v-for="template in pageTemplates" :key="template.id" :value="template.id">
              {{ template.name }}
            </option>
          </select>
        </div>

        <!-- Character position -->
        <div class="form-group mb-6">
          <label class="block text-sm font-medium mb-2">Character Pose</label>
          <select
            v-model="currentPage.content.characterPose"
            class="w-full p-2 border rounded"
            @change="updateCurrentPage"
          >
            <option value="">Select a pose</option>
            <option v-for="pose in characterPoses" :key="pose.id" :value="pose.id">
              {{ pose.name }}
            </option>
          </select>
        </div>

        <!-- Text content -->
        <div class="form-group mb-6">
          <label class="block text-sm font-medium mb-2">Page Text</label>
          <textarea
            v-model="currentPage.content.text.main"
            class="w-full p-2 border rounded h-32"
            @input="updateCurrentPage"
            placeholder="Enter text for this page..."
          ></textarea>
        </div>

        <!-- Page options -->
        <div class="form-group">
          <label class="block text-sm font-medium mb-2">Additional Options</label>
          <div class="options-list space-y-2">
            <div v-for="option in pageOptions" :key="option.id" class="option-item">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  :value="option.id"
                  v-model="currentPage.content.options"
                  @change="updateCurrentPage"
                  class="mr-2"
                />
                <span>{{ option.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Page preview -->
      <div class="page-preview border rounded-lg p-6">
        <h3 class="text-xl font-bold mb-4">Preview</h3>
        <div
          class="preview-container aspect-[3/4] bg-gray-100 rounded flex items-center justify-center overflow-hidden"
        >
          <div v-if="currentPage.templateId" class="relative w-full h-full">
            <!-- This would render your actual page preview -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <h3 class="text-xl mb-4">{{ currentPage.templateId }}</h3>
                <div v-if="characterStore.characters.length > 0" class="character">
                  <CharacterPreview :character="characterStore.characters[0]" :scale="0.5" />
                </div>
                <div class="mt-4 px-8">
                  <p>{{ currentPage.content.text.main || 'No text added yet' }}</p>
                </div>
                <div class="mt-4 flex flex-wrap gap-2 justify-center">
                  <span
                    v-for="optionId in currentPage.content.options"
                    :key="optionId"
                    class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                  >
                    {{ getOptionName(optionId) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-gray-500">Select a template to see the preview</div>
        </div>
      </div>
    </div>

    <!-- Global navigation -->
    <div class="navigation mt-8 flex justify-between">
      <button @click="bookStore.prevStep" class="px-4 py-2 border rounded">Back to Story</button>

      <button
        @click="finishBook"
        class="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        :disabled="!isBookComplete"
      >
        Finish Book
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBookStore } from '@/stores/book'
import { useCharacterStore } from '@/stores/character'
import CharacterPreview from '@/components/character/CharacterPreview.vue'

const bookStore = useBookStore()
const characterStore = useCharacterStore()

const currentPageIndex = ref(0)
const maxPages = bookStore.maxPages

// Sample page templates (in a real app, these would be imported from data files)
const pageTemplates = [
  { id: 'template1', name: 'Standard Page' },
  { id: 'template2', name: 'Full Image' },
  { id: 'template3', name: 'Split Layout' },
  { id: 'template4', name: 'Title Page' },
]

// Sample character poses
const characterPoses = [
  { id: 'pose1', name: 'Standing' },
  { id: 'pose2', name: 'Sitting' },
  { id: 'pose3', name: 'Running' },
  { id: 'pose4', name: 'Jumping' },
]

// Sample page options
const pageOptions = [
  { id: 'option1', name: 'Show background elements' },
  { id: 'option2', name: 'Add decorative border' },
  { id: 'option3', name: 'Include page number' },
  { id: 'option4', name: 'Add special effects' },
]

// Initialize pages if needed
onMounted(() => {
  // Make sure we have all pages initialized
  for (let i = 0; i < maxPages; i++) {
    if (!bookStore.pages[i]) {
      bookStore.updatePage(i, createDefaultPage(i))
    }
  }
})

// Create a default page
const createDefaultPage = (index: number) => {
  return {
    id: `page_${index + 1}`,
    templateId: '',
    content: {
      text: { main: '' },
      options: [],
      characterPose: '',
    },
  }
}

// Get current page data
const currentPage = computed(() => {
  if (!bookStore.pages[currentPageIndex.value]) {
    return createDefaultPage(currentPageIndex.value)
  }
  return bookStore.pages[currentPageIndex.value]
})

// Navigate to previous page
const prevPage = () => {
  if (currentPageIndex.value > 0) {
    currentPageIndex.value--
  }
}

// Navigate to next page
const nextPage = () => {
  if (currentPageIndex.value < maxPages - 1) {
    currentPageIndex.value++
  }
}

// Update the current page
const updateCurrentPage = () => {
  bookStore.updatePage(currentPageIndex.value, currentPage.value)
}

// Get option name by ID
const getOptionName = (optionId: string) => {
  const option = pageOptions.find((opt) => opt.id === optionId)
  return option ? option.name : optionId
}

// Check if the book is complete
const isBookComplete = computed(() => {
  // Book is complete if all pages have a template
  return (
    bookStore.pages.length === maxPages && bookStore.pages.every((page) => page && page.templateId)
  )
})

// Finish the book
const finishBook = async () => {
  if (isBookComplete.value) {
    await bookStore.finalizeBook()
    // In a real app, this would navigate to the next step (checkout, confirmation, etc.)
    alert('Book completed successfully!')
  } else {
    alert('Please complete all pages before finishing the book.')
  }
}
</script>

<style scoped>
.page-indicator {
  font-weight: 500;
}

.preview-container {
  border: 1px solid #e2e8f0;
}
</style>
