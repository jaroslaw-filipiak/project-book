<template>
  <div class="character-creator container mx-auto p-4">
    <!-- Character creation steps -->
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Left: Preview -->
      <div class="w-full md:w-1/3">
        <div class="sticky top-4">
          <div class="preview-card border rounded-lg overflow-hidden">
            <h4 class="p-3 bg-gray-100 border-b font-medium">Podgląd postaci</h4>
            <div class="p-4">
              <CharacterPreview :character="characterStore.currentCharacter" />

              <div v-if="characterStore.currentCharacter" class="character-info mt-4">
                <h3 class="font-bold">{{ characterStore.currentCharacter.name }}</h3>
                <span class="gender-badge" :class="characterStore.currentCharacter.sex">
                  {{ characterStore.currentCharacter.sex === 'male' ? 'Chłopiec' : 'Dziewczynka' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Navigation buttons -->
          <div class="mt-4 space-y-2" v-if="characterStore.currentCharacter">
            <button
              @click="characterStore.previousStep"
              class="w-full p-2 border rounded"
              :disabled="characterStore.currentStep === 1"
            >
              Poprzedni krok
            </button>

            <button
              v-if="characterStore.currentStep < 4"
              @click="characterStore.nextStep"
              class="w-full p-2 border rounded bg-blue-500 text-white"
            >
              Następny krok
            </button>

            <button
              v-else
              @click="finishCharacter"
              class="w-full p-2 border rounded bg-green-500 text-white"
            >
              {{ characterStore.isEditing ? 'Zapisz zmiany' : 'Zapisz postać' }}
            </button>

            <!-- <button
              v-if="!characterStore.isEditing"
              @click="cancelCreation"
              class="w-full p-2 border rounded"
            >
              Anuluj
            </button> -->
          </div>
        </div>
      </div>

      <!-- Right: Step content -->
      <div class="flex-1">
        <!-- Step indicator -->
        <div class="steps-indicator mb-6">
          <div class="flex justify-between">
            <div
              v-for="step in 4"
              :key="step"
              :class="[
                'step-indicator',
                { active: characterStore.currentStep === step },
                { completed: characterStore.currentStep > step },
              ]"
            >
              {{ getStepName(step) }}
            </div>
          </div>
          <div class="progress-bar">
            <div
              class="progress"
              :style="{ width: `${((characterStore.currentStep - 1) / 3) * 100}%` }"
            ></div>
          </div>
        </div>

        <div class="border rounded-lg p-6">
          <!-- Face Editor Step -->
          <FaceEditor v-if="characterStore.currentStep === 2" />

          <!-- Body Editor Step -->
          <BodyEditor v-if="characterStore.currentStep === 3" />

          <!-- Hair Editor Step -->
          <HairEditor v-if="characterStore.currentStep === 4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { useBookStore } from '@/stores/book'
import CharacterPreview from './CharacterPreview.vue'
import FaceEditor from './steps/FaceEditor.vue'
import BodyEditor from './steps/BodyEditor.vue'
import HairEditor from './steps/HairEditor.vue'

const emit = defineEmits<{
  (e: 'character-completed'): void
  (e: 'cancel'): void
}>()

const characterStore = useCharacterStore()
const name = ref('')
const sex = ref('')

// Initialize form if editing
onMounted(() => {
  if (characterStore.isEditing && characterStore.currentCharacter) {
    name.value = characterStore.currentCharacter.name
    sex.value = characterStore.currentCharacter.sex
  }
})

const isBasicInfoValid = computed(() => name.value.trim() && sex.value)

const handleBasicInfo = () => {
  if (!isBasicInfoValid.value) return

  if (characterStore.isEditing && characterStore.currentCharacter) {
    characterStore.updateCharacter(characterStore.currentCharacter.id, {
      name: name.value.trim(),
      sex: sex.value as 'male' | 'female',
    })
  } else {
    characterStore.createCharacter(name.value.trim(), sex.value as 'male' | 'female')
  }

  characterStore.nextStep()
}

// Finish character and ensure it's marked as complete
const finishCharacter = () => {
  if (characterStore.currentCharacter) {
    // Update all character features if they're not yet set
    if (!characterStore.currentCharacter.face) {
      characterStore.updateCharacterFeature('face', { ...selectedFace.value })
    }

    // Mark character as complete
    characterStore.updateCharacter(characterStore.currentCharacter.id, {
      isComplete: true,
    })
    
    // Assign the predetermined question set to this character
    const bookStore = useBookStore()
    bookStore.assignQuestionsToCharacter(
      characterStore.currentCharacter.id, 
      characterStore.currentCharacter.sex
    )

    // Emit event to parent component
    emit('character-completed')
  }
}

const cancelCreation = () => {
  if (characterStore.currentCharacter && !characterStore.isEditing) {
    characterStore.removeCharacter(characterStore.currentCharacter.id)
  }
  characterStore.resetCreation()
  emit('cancel')
}

const getStepName = (step: number): string => {
  switch (step) {
    case 1:
      return 'Basic Info'
    case 2:
      return 'Face'
    case 3:
      return 'Body'
    case 4:
      return 'Hair'
    default:
      return ''
  }
}
</script>

<style scoped>
.steps-indicator {
  margin-bottom: 2rem;
}

.step-indicator {
  position: relative;
  font-size: 0.875rem;
  color: #718096;
}

.step-indicator.active {
  color: #2b6cb0;
  font-weight: 600;
}

.step-indicator.completed {
  color: #48bb78;
}

.progress-bar {
  margin-top: 0.5rem;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #4299e1;
  transition: width 0.3s ease;
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
</style>
