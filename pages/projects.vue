<script setup lang="ts">
definePageMeta({ pageTransition })

function overflowHandler() {
  // looks like a cow shit...
  document.body.style.overflow = window.innerWidth > 768 ? 'hidden' : 'visible'
}

onMounted(() => {
  overflowHandler()

  window.addEventListener('resize', overflowHandler)
})

onUnmounted(() => {
  window.removeEventListener('resize', overflowHandler)
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
