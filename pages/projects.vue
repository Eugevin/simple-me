<script setup lang="ts">
definePageMeta({ pageTransition })

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
</script>

<template>
  <div class="projects-page">
    <Header title="Projects" />
    <div class="container">
      <Drafts />
    </div>
  </div>
</template>

<style scoped lang="scss">
.projects-page {
  min-height: 100vh;
}
</style>