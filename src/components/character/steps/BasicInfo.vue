<template>
  <div class="border rounded-lg p-6">
    <h3 class="text-center text-4xl mb-10">
      {{ characterStore.isEditing ? 'Edytuj bohatera' : 'Krok 1 - Stwórz bohatera' }}
    </h3>

    <div class="max-w-md mx-auto">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="form-group">
          <label class="block text-sm font-medium mb-2">Imię</label>
          <input v-model="name" type="text" required class="w-full p-2 border rounded" />
        </div>

        <div class="form-group">
          <label class="block text-sm font-medium mb-2">Płeć</label>
          <select
            v-model="sex"
            required
            class="w-full p-2 border rounded"
            :disabled="characterStore.isEditing"
          >
            <option value="">Wybierz płeć</option>
            <option value="male">Chłopiec</option>
            <option value="female">Dziewczynka</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          :disabled="!isValid"
        >
          {{ characterStore.isEditing ? 'Zapisz zmiany' : 'Stwórz postać' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCharacterStore } from '@/stores/characters'

const characterStore = useCharacterStore()
const name = ref('')
const sex = ref('')

const isValid = computed(() => name.value.trim() && sex.value)

onMounted(() => {
  if (characterStore.isEditing && characterStore.currentCharacter) {
    name.value = characterStore.currentCharacter.name
    sex.value = characterStore.currentCharacter.sex
  }
})

const handleSubmit = () => {
  if (!isValid.value) return

  if (characterStore.isEditing && characterStore.currentCharacter) {
    characterStore.updateCharacter(characterStore.currentCharacter.id, {
      name: name.value.trim(),
      sex: sex.value as 'male' | 'female',
    })
    characterStore.nextStep()
  } else {
    characterStore.createCharacter(name.value.trim(), sex.value as 'male' | 'female')
  }
}
</script>
