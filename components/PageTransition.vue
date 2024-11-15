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
</script>

<template>
  <div id="transition">
    <h3>{{ pages.find(page => page.link === $route.path)?.title ?? $route.path.split('/').at(-1) }}</h3>
  </div>
</template>

<style scoped lang="scss">
#transition {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
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
