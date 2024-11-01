<script setup lang="ts">
definePageMeta({ pageTransition })
</script>

<template>
  <div class="projects-page">
    <Header title="Projects" />
    <Drafts />
  </div>
</template>

<style scoped lang="scss">
.projects-page {
  min-height: 100vh;
}
</style>