<script setup lang="ts">
import { animate } from 'motion'
import { easeInOutExpo } from '~/static/easings'

const preloadState = ref<number>(0)
const { data: preloadImages } = await useFetch<string[]>('/api/preload')
const loaded = useState<boolean>('loaded')

async function preload() {
  await Promise.allSettled(preloadImages.value!.map((src) => {
    return new Promise<void>((resolve) => {
      const img = new Image()
      img.src = `/images/${src}`

      img.addEventListener('load', () => {
        preloadState.value += Math.floor(100 / preloadImages.value!.length)
        resolve()
      })
    })
  }))

  if (preloadState.value >= 95) {
    preloadState.value = 100
    animate('.preloader', { visibility: 'hidden', opacity: [1, 0] }, { duration: 0.5, easing: easeInOutExpo })
    loaded.value = true

    return
  }

  // TODO: Cringe? Yup, it is, delete it
  alert('Assets loading error')
}

onMounted(() => {
  preload()
})
</script>

<template>
  <div class="preloader">
    <p>{{ preloadState }}%</p>
  </div>
</template>

<style scoped lang="scss">
.preloader {
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: var(--black);
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    pointer-events: none;
  }
}
</style>
