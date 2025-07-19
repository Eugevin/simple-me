<script setup lang="ts">
import { animate } from 'motion'
import { easeInOutExpo } from '~/static/easings'

const { data: preloadImages } = await useFetch<string[]>('/api/preload')

const loaded = useState<boolean>('loaded')

const preloadState = ref<number>(0)
const preloadEl = ref<HTMLElement>()

function getPreloadPromises(images: string[]): Promise<void>[] {
  const percentPerPicture = Math.floor(100 / images.length)

  const preloadPromises = images.map((src) => {
    return new Promise<void>((resolve) => {
      const img = new Image()
      img.src = `/images/${src}`

      img.addEventListener('load', () => {
        preloadState.value += percentPerPicture
        resolve()
      })
    })
  })

  return preloadPromises
}

async function preload() {
  await Promise.allSettled(getPreloadPromises(preloadImages.value!))

  animate('.preloader',
    {
      visibility: 'hidden',
      opacity: [1, 0],
    },
    {
      duration: 0.5,
      easing: easeInOutExpo,
    })

  preloadState.value = 100
  loaded.value = true
}

onMounted(() => {
  preload()
})
</script>

<template>
  <div
    ref="preloadEl"
    class="preloader"
  >
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
