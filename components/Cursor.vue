<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { Cursor } from '~/types'

// CONSTANTS
const bigScale: number = 3
const defaultShift: string = `.2rem`

// OTHER SHIT

const cursor = useState<Cursor>('cursor', () => {
  return {
    x: 0,
    y: 0,
    active: false,
    hover: false,
  }
})

const cursorStyles = computed<CSSProperties>(() => {
  const transform = getTransformStyle(
    cursor.value.x,
    cursor.value.y,
    cursor.value.hover,
  )

  const opacity = cursor.value.active ? 1 : 0

  return {
    opacity,
    transform,
  }
})

function getTransformStyle(xPos: number, yPos: number, hover: boolean): string {
  const [x, y] = [xPos, yPos].map(pos => `calc(${pos}px - ${defaultShift})`)
  const scale = `scale(${hover ? bigScale : 1})`

  return `translate3d(${x}, ${y}, 0) ${scale}`
}

function isHover(target: HTMLElement) {
  return target.matches('button, a, .hoverable')
}

function moveHandler(e: MouseEvent) {
  cursor.value.active = true

  const { x, y } = e
  const target = e.target as HTMLElement

  cursor.value.x = x
  cursor.value.y = y

  if (isHover(target)) {
    cursor.value.hover = true
    return
  }

  cursor.value.hover = false
}

function leaveHandler() {
  cursor.value.active = false
}

onMounted(() => {
  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('mouseleave', leaveHandler)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', moveHandler)
  document.removeEventListener('mouseleave', leaveHandler)
})
</script>

<template>
  <div
    class="cursor"
    :style="cursorStyles"
  />
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
  will-change: transform, opacity;

  @include touch {
    display: none;
  }
}
</style>
