<script setup lang="ts">
import type { Draft } from '~/types';

const drafts = inject('drafts') as Draft[]

let disableAllHandlers = false

let activeMoving = ref<boolean>(false)

function draftMoveHandler(e: MouseEvent) {
  activeMoving.value = true
  const allDrafts = document.querySelectorAll<HTMLElement>('.drafts .drafts__item')

  const mouseX = e.clientX
  const mouseY = e.clientY

  allDrafts.forEach(draft => {
    draft.style.transform = `translate(calc(${mouseX}px - 10rem), calc(${mouseY}px - 5rem))`

    if (draft.style.opacity !== '1') draft.style.opacity = '1'
  })
}

function wheelHandler(e: WheelEvent) {
  if (disableAllHandlers) return

  const allDrafts = Array.from(document.querySelectorAll<HTMLElement>('.drafts .drafts__item'))

  if (e.deltaY > 0) {
    const filteredDrafts = allDrafts.filter(draft => !draft.classList.contains('hide'))
    filteredDrafts.length > 1 ? filteredDrafts[filteredDrafts.length - 1]?.classList.add('hide') : null
  }

  if (e.deltaY < 0) {
    const filteredDrafts = allDrafts.filter(draft => draft.classList.contains('hide'))
    filteredDrafts[0]?.classList.remove('hide')
  }
}

const draftWheelhandler = throttle(wheelHandler, 1000)

function draftLeaveHandler(e: MouseEvent) {
  if (disableAllHandlers) return

  const allDrafts = document.querySelectorAll<HTMLElement>('.drafts .drafts__item')

  allDrafts.forEach(draft => draft.style.opacity = '0')
}

function draftDownHandler(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.classList.contains('drafts__item') || disableAllHandlers) return
  disableAllHandlers = true

  target.style.scale = '5'
  navigateTo(target.dataset.link)
}
</script>

<template>
  <div class="drafts" @mousemove="draftMoveHandler" @mouseleave="draftLeaveHandler" @wheel="draftWheelhandler" @mousedown="draftDownHandler">
    <div class="drafts__description" :class="{ active: activeMoving }">Some of my <b>projects</b>, that i can show to you, hermano:</div>
    <img :src="draft.image" :data-link="`/project/${draft.title}`" :style="`--speed: ${1 - i / 10}s`" alt="project image" class="drafts__item" v-for="draft, i in drafts" :key="draft.image" >
  </div>
</template>

<style scoped lang="scss">
.drafts {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;

  &__description {
    visibility: hidden;
    opacity: 0;
    transform: translateY(1rem);
    position: fixed;
    top: 50%;
    left: 70%;
    max-width: 400px;
    transition: 1s ease-out;

    b {
      font-weight: 700
    }

    &.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }

  &__item {
    filter: grayscale(1);
    position: fixed;
    top: 0;
    left: 0;
    width: 20rem;
    will-change: transform;
    transform: translate(-100%, -100%);
    opacity: 0;
    clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 0);
    transition: var(--speed) ease-out;
  }

  .hide {
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
  }
}
</style>