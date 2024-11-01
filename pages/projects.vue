<script setup lang="ts">
definePageMeta({ pageTransition })

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = 'visible'
})
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