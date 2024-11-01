<script setup lang="ts">
import { animate } from 'motion';
import { easeInOutExpo } from '~/static/easings';

const emit = defineEmits<{
  loaded: []
}>()

const preloadState = ref<number>(0)

async function preload() {
  document.body.style.overflow = 'hidden'

  animate('.preloader p', { visibility: 'visible', opacity: [0, 1] }, { duration: .5, easing: easeInOutExpo }).finished

  await animate(
    (progress) => preloadState.value = Math.round(progress * 100),
    { duration: 1, easing: easeInOutExpo }
  ).finished

  document.body.style.overflow = 'initial'

  emit('loaded')

  animate('.preloader', { visibility: 'hidden', opacity: [1, 0] }, { duration: 1, easing: easeInOutExpo }).finished
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
    visibility: hidden;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: url('/images/bg.png');
    z-index: -1;
  }
}
</style>