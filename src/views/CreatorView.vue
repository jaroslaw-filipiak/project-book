<template>
  <div class="book-creator-view">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Create Your Personalized Book</h1>

      <!-- Main book creator component -->
      <BookCreator />
    </div>
  </div>
</template>

<script setup lang="ts">
import BookCreator from '@/components/book/BookCreator.vue'
</script>
