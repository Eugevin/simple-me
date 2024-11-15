<script setup lang="ts">
definePageMeta({ pageTransition })

const resizeController = new AbortController()

onMounted(() => {
  document.body.style.overflow = window.innerWidth > 768 ? 'hidden' : 'visible'

  window.addEventListener('resize', () => {
    document.body.style.overflow = window.innerWidth > 768 ? 'hidden' : 'visible'
  }, { signal: resizeController.signal })
})

onUnmounted(() => {
  resizeController.abort()
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
