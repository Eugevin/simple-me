<script setup lang="ts">
import { animate } from 'motion';
import { easeInOutExpo } from '~/static/easings';
import type { Draft } from '~/types';

definePageMeta({ pageTransition })

const route = useRoute()

const drafts = inject('drafts') as Draft[]
const currentDraft = drafts.find(draft => draft.title === String(route.params.id))

async function showPage() {
  animate('.project .project__image', { visibility: 'visible', clipPath: ['polygon(0 100%, 0 100%, 0 0, 0 0)', 'polygon(100% 100%, 0 100%, 0 0, 100% 0)']}, { duration: 1, easing: easeInOutExpo })
  animate('.project .project__stack', { visibility: 'visible', clipPath: ['polygon(0 100%, 0 100%, 0 0, 0 0)', 'polygon(100% 100%, 0 100%, 0 0, 100% 0)']}, { duration: 0.8, easing: easeInOutExpo })
  animate('.project .project__description', { visibility: 'visible', clipPath: ['polygon(0 0, 100% 0, 100% 0, 0 0)', 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)']}, { delay: 0.3, duration: 0.6, easing: easeInOutExpo })
}

onMounted(() => {
  showPage()
})
</script>

<template>
  <div class="project-page">
    <Header :title="currentDraft?.title ?? 'undefined'" />
    <div class="container">
      <div class="project" v-if="currentDraft">
        <div class="project__image">
          <img :src="`${currentDraft.image.split('.webp')[0]}-vertical.jpg`" alt="project image">
        </div>
        <div class="project__stack">{{ currentDraft.stack }}</div>
        <div class="project__description">
          <p v-html="currentDraft.description"></p>
          <p>Which I participated in:</p>
          <ul>
            <li v-for="detail in currentDraft.details" :key="detail">{{ detail }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-page {
  .project {
    display: grid;
    grid-template-areas:
      "image stack"
      "image description"
      "image description";
    gap: 1rem;
    color: var(--black);

    &__image {
      visibility: hidden;
      width: 100%;
      overflow: hidden;
      grid-area: image;
      filter: grayscale(1);

      img {
        width: 100%;
        height: 100%;
        transform: scale(1.1);
        object-fit: cover;
      }
    }

    &__stack {
      visibility: hidden;
      padding: 1rem 0 1rem .5rem;
      background: #D9D9D9;
      grid-area: stack;
      font-weight: 700;
      text-transform: uppercase;
      z-index: 1;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
        background: url('/images/arrow.svg') no-repeat center right / contain;
        z-index: -1;
        pointer-events: none;
        mix-blend-mode: difference;
      }
    }

    &__description {
      letter-spacing: 2px;
      visibility: hidden;
      line-height: 1.5;
      font-size: .8rem;
      background: #D9D9D9;
      grid-area: description;
      padding: .5rem;

      p:last-of-type {
        margin: 1rem 0;
      }

      ul {
        display: flex;
        flex-direction: column;
        gap: .5rem;

        li {
          position: relative;
          padding-left: 2rem;

          &::first-letter {
            text-transform: uppercase;
            font-weight: bold;
          }

          &::before {
            content: "";
            position: absolute;
            top: .1rem;
            left: 0;
            height: 1rem;
            width: 1rem;
            background: url('/images/smile.svg') no-repeat center / contain;
          }
        }
      }
    }

    &__stack, &__description {
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: url('/images/bg.png');
        opacity: 0.1;
        z-index: 0;
        pointer-events: none;
      }
    }
  }
}
</style>