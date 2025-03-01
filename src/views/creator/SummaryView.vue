<template>
  <div class="summary-view container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Book Summary</h1>
    
    <CreatorNavigation currentStep="podsumowanie" />

    <div class="summary-container">
      <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
        <h2 class="text-2xl font-bold text-green-700 mb-2">Gratulacje!</h2>
        <p class="text-green-700">
          Twoja książka jest gotowa do finalizacji. Poniżej znajdziesz podsumowanie.
        </p>
      </div>

      <!-- Book overview -->
      <div class="book-overview grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <!-- Characters summary -->
        <div class="characters-summary border rounded-lg p-6">
          <h3 class="text-xl font-bold mb-4">Bohaterowie</h3>
          <div class="characters-list space-y-4">
            <div 
              v-for="character in characterStore.characters" 
              :key="character.id"
              class="character-item flex items-center p-3 bg-gray-50 rounded"
            >
              <div class="character-avatar mr-3">
                <CharacterPreview :character="character" :scale="0.3" />
              </div>
              <div>
                <h4 class="font-medium">{{ character.name }}</h4>
                <p class="text-sm text-gray-600">
                  {{ character.sex === 'male' ? 'Chłopiec' : 'Dziewczynka' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Story summary -->
        <div class="story-summary border rounded-lg p-6">
          <h3 class="text-xl font-bold mb-4">Historia</h3>
          <div class="story-stats">
            <div class="stat-item p-3 mb-3 bg-gray-50 rounded">
              <p class="font-medium">Liczba pytań</p>
              <p class="text-2xl font-bold">{{ bookStore.storyQuestions.length }}</p>
            </div>
            <div class="stat-item p-3 bg-gray-50 rounded">
              <p class="font-medium">Odpowiedzi</p>
              <p class="text-2xl font-bold">
                {{ Object.keys(bookStore.storyAnswers).length * bookStore.storyQuestions.length }}
              </p>
            </div>
          </div>
        </div>

        <!-- Pages summary -->
        <div class="pages-summary border rounded-lg p-6">
          <h3 class="text-xl font-bold mb-4">Strony</h3>
          <div class="pages-stats">
            <div class="stat-item p-3 mb-3 bg-gray-50 rounded">
              <p class="font-medium">Całkowita liczba stron</p>
              <p class="text-2xl font-bold">{{ bookStore.pages.length }}</p>
            </div>
            <div class="stat-item p-3 bg-gray-50 rounded">
              <p class="font-medium">Ukończonych stron</p>
              <p class="text-2xl font-bold">
                {{ bookStore.pages.filter(p => p && p.templateId).length }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Book preview carousel -->
      <div class="book-preview mb-10">
        <h3 class="text-xl font-bold mb-4">Podgląd książki</h3>
        <div class="preview-carousel border rounded-lg p-6 bg-gray-50">
          <div class="flex items-center justify-center space-x-4">
            <button 
              @click="prevPreviewPage" 
              class="w-10 h-10 bg-white rounded-full flex items-center justify-center border"
              :disabled="previewPageIndex === 0"
            >
              &lt;
            </button>
            
            <div class="preview-container w-[300px] h-[400px] bg-white border rounded-lg flex items-center justify-center">
              <div v-if="currentPreviewPage && currentPreviewPage.templateId" class="p-4 text-center">
                <h4 class="text-lg font-medium mb-2">{{ getTemplateName(currentPreviewPage.templateId) }}</h4>
                <div v-if="characterStore.characters.length > 0" class="flex justify-center my-4">
                  <CharacterPreview :character="characterStore.characters[0]" :scale="0.5" />
                </div>
                <p class="text-sm">{{ currentPreviewPage.content.text.main || 'No text on this page' }}</p>
              </div>
              <div v-else class="text-gray-400">Empty page</div>
            </div>
            
            <button 
              @click="nextPreviewPage" 
              class="w-10 h-10 bg-white rounded-full flex items-center justify-center border"
              :disabled="previewPageIndex === bookStore.pages.length - 1"
            >
              &gt;
            </button>
          </div>
          <div class="text-center mt-4">
            Page {{ previewPageIndex + 1 }} of {{ bookStore.pages.length }}
          </div>
        </div>
      </div>

      <!-- Checkout buttons -->
      <div class="checkout-actions flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <button class="px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg font-medium">
          Zamów wersję drukowaną (99 zł)
        </button>
        <button class="px-6 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 text-lg font-medium">
          Pobierz wersję cyfrową PDF (49 zł)
        </button>
      </div>

      <!-- Navigation -->
      <div class="navigation mt-8 flex justify-between">
        <button @click="router.push('/kreator/strony')" class="px-4 py-2 border rounded">
          Back to Pages
        </button>
        
        <button @click="router.push('/')" class="px-4 py-2 border rounded">
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/book'
import { useCharacterStore } from '@/stores/character'
import CharacterPreview from '@/components/character/CharacterPreview.vue'
import CreatorNavigation from '@/components/book/CreatorNavigation.vue'

const router = useRouter()
const bookStore = useBookStore()
const characterStore = useCharacterStore()

const previewPageIndex = ref(0)

// Sample page templates
const pageTemplates = [
  { id: 'template1', name: 'Standard Page' },
  { id: 'template2', name: 'Full Image' },
  { id: 'template3', name: 'Split Layout' },
  { id: 'template4', name: 'Title Page' },
]

// Get template name by ID
const getTemplateName = (templateId: string) => {
  const template = pageTemplates.find(t => t.id === templateId)
  return template ? template.name : templateId
}

// Get current preview page
const currentPreviewPage = computed(() => bookStore.pages[previewPageIndex.value])

// Navigation functions for preview carousel
const prevPreviewPage = () => {
  if (previewPageIndex.value > 0) {
    previewPageIndex.value--
  }
}

const nextPreviewPage = () => {
  if (previewPageIndex.value < bookStore.pages.length - 1) {
    previewPageIndex.value++
  }
}

// Check if the book is complete
onMounted(() => {
  // If book is not complete, redirect back to pages
  const isBookComplete = bookStore.pages.length === bookStore.maxPages && 
                         bookStore.pages.every(page => page && page.templateId)
                         
  if (!isBookComplete) {
    router.push('/kreator/strony')
  }
})
</script>

<style scoped>
.step-tab {
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
}

.step-tab.router-link-active {
  color: #2b6cb0;
  border-bottom-color: #2b6cb0;
}

.preview-container {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>