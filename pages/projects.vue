<script setup lang="ts">
definePageMeta({ pageTransition })

function overflowHandler() {
  document.body.style.overflow = window.innerWidth > 768 ? 'hidden' : 'visible'

  window.addEventListener('resize', () => {
    document.body.style.overflow = window.innerWidth > 768 ? 'hidden' : 'visible'
  })
}

onMounted(() => {
  overflowHandler()
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