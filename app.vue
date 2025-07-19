<script setup lang="ts">
const loaded = useState<boolean>('loaded', () => false)
</script>

<template>
  <Cursor />
  <PageTransition />
  <Preloader />
  <main v-show="loaded">
    <NuxtPage />
    <Footer />
  </main>
</template>
