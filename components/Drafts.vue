<script setup lang="ts">
import { animate } from 'motion'
import { easeInOutExpo } from '~/static/easings'
import type { Cursor, Draft } from '~/types'

const { data: drafts } = await useFetch<Draft[]>('/api/drafts')

let wheelBlocked: boolean = false
let currentDraft: number

const cursor = useState<Cursor>('cursor')

const draftEls = ref<HTMLElement[]>([])
const draftsMoving = ref<boolean>(false)

const [slowDuration, longDuration] = [0.5, 1]
const [xOffset, yOffset] = ['10rem', '5rem']
const [clipShow, clipHide] = [
  'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
  'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
]

const transformStyles = computed<string>(() => {
  const [x, y] = [
    `calc(${cursor.value.x}px - ${xOffset})`,
    `calc(${cursor.value.y}px - ${yOffset})`,
  ]

  return `translate3d(${x}, ${y}, 0)`
})

function moveHandler() {
  if (!draftsMoving.value) draftsMoving.value = true
}

function leaveHandler() {
  if (draftsMoving.value) draftsMoving.value = false
}

async function wheelHandler(e: WheelEvent) {
  if (wheelBlocked) return
  wheelBlocked = true

  const wheelDown = e.deltaY > 0

  const showAvailable = !wheelDown && currentDraft < draftEls.value.length - 1
  const hideAvailable = wheelDown && currentDraft > 0

  if (showAvailable) {
    currentDraft++
    const draftEl: HTMLElement = draftEls.value[currentDraft]

    await animate(draftEl,
      {
        clipPath: [clipHide, clipShow],
      },
      {
        duration: longDuration,
        easing: easeInOutExpo,
      }).finished
  }

  if (hideAvailable) {
    const draftEl: HTMLElement = draftEls.value[currentDraft]

    await animate(draftEl,
      {
        clipPath: [clipShow, clipHide],
      },
      {
        duration: longDuration,
        easing: easeInOutExpo,
      }).finished

    currentDraft--
  }

  wheelBlocked = false
}

function downHandler(e: MouseEvent) {
  const target = e.target as HTMLElement
  const draftEl: HTMLElement = draftEls.value[currentDraft]

  animate(draftEl,
    {
      filter: ['grayscale(1)', 'grayscale(0)'],
    },
    {
      duration: slowDuration,
      easing: easeInOutExpo,
    })

  navigateTo(target.dataset.link)
}

onMounted(() => {
  currentDraft = draftEls.value.length - 1
})
</script>

<template>
  <div
    class="drafts"
    @mousemove="moveHandler"
    @mouseleave="leaveHandler"
    @wheel="wheelHandler"
    @mousedown="downHandler"
  >
    <div
      class="drafts__description"
      :class="{ active: draftsMoving }"
    >
      Some of my <b>projects</b>, that i can show to you, hermano:
    </div>
    <div
      class="drafts__items"
      :style="{
        '--transform': transformStyles,
        '--opacity': draftsMoving ? 1 : 0,
      }"
    >
      <img
        v-for="draft, i in drafts"
        ref="draftEls"
        :key="draft.image"
        :src="`/images/drafts/${draft.image}`"
        :data-link="`/project/${draft.title}`"
        :style="`--speed: ${1 - i / 10}s`"
        alt="draft image"
        class="drafts__item hoverable"
      >
    </div>
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
    pointer-events: none;
    mix-blend-mode: difference;
    z-index: 1;
    visibility: hidden;
    opacity: 0;
    transform: translate3d(0, 1rem, 0);
    position: fixed;
    top: 50%;
    left: 70%;
    max-width: 10rem;
    transition: var(--transition);
    rotate: -4deg;

    b {
      display: inline-block;
      rotate: 2deg;
    }

    &.active {
      opacity: 1;
      visibility: visible;
      transform: translate3d(0, 0, 0);
    }
  }

  &__items {
    background-color: red;

    img {
      filter: grayscale(1);
      position: fixed;
      top: 0;
      left: 0;
      height: calc(20rem / (16 / 9));
      width: 20rem;
      will-change: transform, opacity;
      opacity: var(--opacity);
      transform: var(--transform);
      transition: var(--speed) ease-out;
    }
  }

  @include touch {
    // TODO: Cringe...
    width: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column-reverse;
    gap: 1rem;
    position: static;

    &__description {
      order: 999;
      position: static !important;
      opacity: 1 !important;
      transform: none !important;
      visibility: visible !important;
      max-width: 20rem;
    }

    &__item {
      position: static !important;
      opacity: 1 !important;
      transform: none !important;
      scale: none !important;
      visibility: visible !important;
      clip-path: none !important;
      width: 100%;
    }
  }

  @include touch {
    height: auto;
    position: static;
  }
}
</style>
