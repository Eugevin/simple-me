<script setup lang="ts">
import type { Page } from '~/types'

defineProps<{
  title: string
}>()

const headerEl = ref<HTMLElement>()
const headerSize = reactive<{ h: number, w: number }>({
  h: 0,
  w: 0,
})

const route = useRoute()

const pages = useState<Page[]>('pages')

const availablePages = computed<Page[]>(() => {
  return pages.value.filter(page => page.link !== `/${String(route.name)}`)
})

const menuActive = ref<boolean>(false)

function resizeHandler() {
  headerSize.h = headerEl.value?.clientHeight ?? 0
  headerSize.w = headerEl.value?.clientWidth ?? 0
}

onMounted(() => {
  resizeHandler()
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
})
</script>

<template>
  <header
    ref="headerEl"
    class="header"
  >
    <Bezier
      :lines="20"
      :height="headerSize.h"
      :width="headerSize.w"
    />
    <div class="container">
      <h2 class="header__title">
        {{ title }}
      </h2>
      <div
        class="header__menu hoverable"
        @click="menuActive = !menuActive"
      >
        men<span
          :class="{ active: menuActive }"
          class="hoverable"
        >u</span>
      </div>
      <nav
        class="header__navigation"
        :class="{ active: menuActive }"
      >
        <NuxtLink
          v-for="page in availablePages"
          :key="page.title"
          :to="page.link"
        >
          {{ page.title }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: relative;
  mix-blend-mode: difference;
  z-index: 9;
  margin-bottom: 2rem;

  .container {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__title {
    padding: 1rem 0;
    max-width: 90%;
  }

  &__menu {
    position: fixed;
    right: 1rem;
    text-transform: uppercase;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    span {
      transition: transform var(--transition);

      &.active {
        transform: rotate(-180deg) translateY(-2rem);
      }
    }

    &:hover {
      span:not(.active) {
        transform: translate(50%, 25%) rotate(45deg);
      }
    }
  }

  &__navigation {
    background: rgba(31, 31, 31, 0.5);
    position: fixed;
    top: 5rem;
    right: 0;
    text-transform: uppercase;
    text-align: left;
    display: flex;
    flex-direction: column;
    transform: translate(50%);
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);

    a {
      padding: .5rem .5rem .5rem .5rem;
      transition: var(--transition);
      cursor: pointer;

      &:hover {
        background: var(--white);
        color: var(--black);
      }
    }

    &.active {
      transform: translate(0);
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
