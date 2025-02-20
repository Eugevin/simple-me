<script setup lang="ts">
class Cursor {
  cursorEl: HTMLElement
  cursorX: number = 0
  cursorY: number = 0
  cursorHover: boolean = false
  cursorActive: boolean = false

  constructor(cursorEl: HTMLElement) {
    this.cursorEl = cursorEl

    this.init()
  }

  init() {
    this.listeners()
    this.loop()
  }

  loop() {
    this.cursorEl.style.opacity = this.cursorActive ? '1' : '0'
    this.cursorEl.style.transform = `translate3d(calc(${this.cursorX}px - .2rem), calc(${this.cursorY}px - .2rem), 0) scale(${this.cursorHover ? 3 : 1})`

    requestAnimationFrame(this.loop.bind(this))
  }

  listeners() {
    document.body.addEventListener('mousemove', (e) => {
      this.cursorActive = true

      this.cursorX = e.clientX
      this.cursorY = e.clientY

      const target = e.target as HTMLElement
      this.cursorHover = !!(target.tagName.toLowerCase() === 'button') || !!(target.tagName.toLowerCase() === 'a') || target.classList.contains('hoverable')
    })

    document.body.addEventListener('mouseleave', () => {
      this.cursorActive = false
    })
  }
}

onMounted(() => {
  new Cursor(document.querySelector('.cursor')!)
})
</script>

<template>
  <div class="cursor" />
</template>

<style scoped lang="scss">
.cursor {
  backdrop-filter: invert(100%);
  mix-blend-mode: difference;
  position: fixed;
  top: 0;
  left: 0;
  padding: .2rem;
  background: #1F1F1F90;
  border-radius: 100%;
  z-index: 98;
  opacity: 0;
  transition: .5s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;

  @include touch {
    display: none;
  }
}
</style>
