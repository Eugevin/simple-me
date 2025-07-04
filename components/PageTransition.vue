<script setup lang="ts">
import type { Page } from '~/types'

const pages = useState<Page[]>('pages', () => {
  return [
    {
      link: '/',
      title: 'home',
    },
    {
      link: '/projects',
      title: 'projects',
    },
    {
      link: '/about',
      title: 'about me',
    },
    {
      link: '/contacts',
      title: 'contacts',
    },
  ]
})

const route = useRoute()

const currentPage = computed(() => {
  const mainPage = pages.value.find(page => page.link === route.path)
  const easyRoute = route.path.split('/').at(-1)

  return mainPage?.title ?? easyRoute
})
</script>

<template>
  <div id="transition">
    <h3>{{ currentPage }}</h3>
  </div>
</template>

<style scoped lang="scss">
#transition {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  background: var(--black);
  z-index: 99;

  h3 {
    font-weight: 800;
    text-transform: uppercase;
    will-change: transform;
  }

  &::before {
    @include noise;
  }
}
</style>
