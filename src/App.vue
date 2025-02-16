<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="border flex justify-center gap-4 p-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/jak-to-dziala">Jak to działa?</RouterLink>
        <RouterLink to="/faq">FAQ</RouterLink>
        <RouterLink to="/o-nas">O nas</RouterLink>
        <RouterLink to="/kreator">Stwórz książeczkę</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

  <footer class="hidden">
    <p>&copy; {{ new Date().getFullYear() }} Generator</p>
  </footer>
</template>

<style scoped></style>
