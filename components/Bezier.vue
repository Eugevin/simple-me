<script setup lang="ts">
const { lines, height, width } = defineProps<{
  lines: number
  height: number
  width: number
}>()

const canvasEl = ref<HTMLCanvasElement>()
const animationID = ref<number>()

const ctx = computed(() => canvasEl.value?.getContext('2d'))
const base = computed<{ amp: number, offset: number }>(() => ({
  amp: height * 0.33,
  offset: width * 0.1,
}))

function animate(t: number) {
  if (!ctx.value) return

  const { amp, offset } = base.value

  ctx.value.clearRect(0, 0, width, height)

  for (let i = 0; i < lines; i++) {
    // Вертикальная позиция линии
    const y = offset + i * ((height - 2 * offset) / (lines - 1))

    // Немного смещаем фазы, чтобы линии "дышали" по-разному
    const phase = t * 0.001 + i * 0.25

    // Контрольные точки для Безье (всего 4 точки: start, ctrl1, ctrl2, end)
    const x0 = 0, y0 = y
    const x1 = width * 0.33, y1 = y + Math.sin(phase) * amp
    const x2 = width * 0.66, y2 = y - Math.sin(phase + 1) * amp
    const x3 = width, y3 = y

    ctx.value.save()
    ctx.value.beginPath()
    ctx.value.moveTo(x0, y0)
    ctx.value.bezierCurveTo(x1, y1, x2, y2, x3, y3)
    ctx.value.strokeStyle = 'rgba(255,255,255,0.88)'
    ctx.value.lineWidth = 2.5
    ctx.value.shadowColor = '#fff'
    ctx.value.shadowBlur = 6
    ctx.value.stroke()
    ctx.value.restore()
  }

  animationID.value = requestAnimationFrame(animate)
}

onMounted(() => {
  animate(0)
})

onUnmounted(() => {
  if (animationID.value) cancelAnimationFrame(animationID.value)
})
</script>

<template>
  <canvas
    ref="canvasEl"
    :width="width"
    :height="height"
  />
</template>

<style scoped lang="scss">
canvas {
  z-index: -1;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  opacity: .1;
}
</style>
