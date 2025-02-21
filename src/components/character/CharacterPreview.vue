<template>
  <div class="border rounded-lg p-4 w-64">
    <div class="aspect-square bg-gray-100 mb-4 rounded">
      <!-- Preview image or placeholder -->
      <div v-if="!character" class="w-full h-full flex items-center justify-center text-gray-400">
        No character selected
      </div>
      <div v-else class="w-full h-full relative">
        <!-- Character visualization layers -->
        <div class="absolute inset-0" v-if="character.body">
          <!-- Body visualization -->
        </div>
        <div class="absolute inset-0" v-if="character.face">
          <!-- Face visualization -->
        </div>
        <div class="absolute inset-0" v-if="character.hair">
          <!-- Hair visualization -->
        </div>
      </div>
    </div>

    <div v-if="character" class="space-y-2">
      <p class="font-bold">{{ character.name }}</p>
      <p class="text-sm">{{ character.sex === 'male' ? 'Chłopiec' : 'Dziewczynka' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  character: {
    type: Object,
    required: false,
    default: null,
  },
})
</script>
