<script setup lang="ts">
import { animate, stagger } from 'motion';
import { clipPaths } from '~/static/clipPaths';
import { easeInOutExpo } from '~/static/easings';
import type { Page } from '~/types';

definePageMeta({ pageTransition })

const words: string[] = [
  'frontend',
  'javascript',
  'typescript',
  'vuejs',
  'html5',
  'css3',
  'expressjs',
  'nestjs',
  'mongodb',
  'docker',
  'webrtc',
  'jwt',
  'socket.io',
  'ci/cd',
  'canvas',
  'webgl'
]

const pages = inject('pages') as Page[]

function showPage() {
  animate('.me__title span', { visibility: 'visible', opacity: [0, 1] }, { delay: stagger(0.05), easing: easeInOutExpo })
  animate('.me__image', { visibility: 'visible', clipPath: [...clipPaths.toRight]}, { duration: 1, easing: easeInOutExpo })
  animate('.me__pages button', { visibility: 'visible', opacity: [0, 1] }, { delay: stagger(0.25), easing: easeInOutExpo })
}

useAnimations(showPage)
</script>

<template>
  <div class="index-page">
    <Fastline :words />
    <div class="container">
      <div class="me">
        <h1 class="me__title">
          <span v-for="letter in 'Eugene Vinokurov'" :key="letter">{{ letter }}</span>
        </h1>
        <div class="me__image">
          <img src="/images/me.webp" alt="my photo" class="me__image">
        </div>
        <div class="me__pages">
          <Input type="button" v-for="page in pages.filter(page => page.title !== 'home')" :key="page.title" @click="navigateTo(page.link)">{{ page.title.toUpperCase() }}</Input>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-page {
  position: relative;

  .me {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__title {
      span {
        visibility: hidden;
      }
    }

    &__image {
      height: 10rem;
      width: 100%;
      visibility: hidden;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: 0 15%;
        filter: grayscale(1);
      }
    }

    &__pages {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;

      > * {
        visibility: hidden;
        flex: 1 1 auto;
      }
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: -2rem;
    right: -1.8rem;
    height: 15rem;
    width: 15rem;
    background: url('/images/fingerprint.svg') no-repeat center;
    background-size: 90%;
    z-index: -1;
    transform-origin: center;
    animation: fingerprintAnimation 25s linear infinite;
  }

  @keyframes fingerprintAnimation {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>