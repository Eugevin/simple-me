<script setup lang="ts">
const { lines, height, width } = defineProps<{
  lines: number
  height: number
  width: number
}>()

const canvasEl = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null | undefined = null
let animationID: number | null = null

const base = computed<{ amp: number, offset: number }>(() => ({
  amp: height * 0.33,
  offset: width * 0.1,
}))

function animate(t: number) {
  if (!ctx) return

  const { amp, offset } = base.value

  ctx.clearRect(0, 0, width, height)

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

    ctx.save()
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3)
    ctx.strokeStyle = 'rgba(255,255,255,0.88)'
    ctx.lineWidth = 2.5
    ctx.shadowColor = '#fff'
    ctx.shadowBlur = 6
    ctx.stroke()
    ctx.restore()
  }

  animationID = requestAnimationFrame(animate)
}

onMounted(() => {
  ctx = canvasEl.value?.getContext('2d')
  animate(0)
})

onUnmounted(() => {
  if (animationID) cancelAnimationFrame(animationID)
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
