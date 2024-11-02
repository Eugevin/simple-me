<script setup lang="ts">
function cursorAnimation() {
  document.body.addEventListener('mousemove', (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const cursorHover = !!(target.tagName.toLowerCase() === 'button') || !!(target.tagName.toLowerCase() === 'a') || target.classList.contains('hoverable')

    const mouseX = e.clientX
    const mouseY = e.clientY

    document.querySelector<HTMLElement>('.cursor')!.style.opacity = '1'
    document.querySelector<HTMLElement>('.cursor')!.style.transform = `translate(calc(${mouseX}px - .2rem), calc(${mouseY}px - .2rem)) scale(${cursorHover ? 3 : 1})`
  })

  document.body.addEventListener('mouseleave', (e: MouseEvent) => {
    document.querySelector<HTMLElement>('.cursor')!.style.opacity = '0'
  })
}

onMounted(() => {
  cursorAnimation()
})
</script>

<template>
  <div class="cursor"></div>
</template>

<style scoped lang="scss">
.cursor {
  mix-blend-mode: difference;
  position: fixed;
  top: 0;
  left: 0;
  padding: .2rem;
  background: #1F1F1F90;
  border-radius: 100%;
  z-index: 98;
  opacity: 0;
  transition: .5s ease-out;
  pointer-events: none;
}
</style>