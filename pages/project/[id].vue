<script setup lang="ts">
import { animate } from 'motion';
import { clipPaths } from '~/static/clipPaths';
import { easeInOutExpo } from '~/static/easings';
import type { Draft } from '~/types';

definePageMeta({ pageTransition })

const route = useRoute()

const { data: currentDraft } = await useFetch<Draft>(
  '/api/drafts',
  {
    query: { name: route.params.id }
  }
)

async function showPage() {
  animate('.project .project__image', { visibility: 'visible', clipPath: [...clipPaths.toRight]}, { duration: 1, easing: easeInOutExpo })
  animate('.project .project__stack', { visibility: 'visible', clipPath: [...clipPaths.toRight]}, { duration: 0.8, easing: easeInOutExpo })
  animate('.project .project__description', { visibility: 'visible', clipPath: [...clipPaths.toBottom]}, { delay: 0.3, duration: 0.6, easing: easeInOutExpo })
}

useAnimations(showPage)
</script>

<template>
  <div class="project-page">
    <Header :title="currentDraft?.title ?? 'undefined'" />
    <div class="container">
      <div class="project" v-if="currentDraft">
        <div class="project__image">
          <img :src="`/images/drafts/${currentDraft.image.split('.')[0]}-v.webp`" alt="project image">
          <img :src="`/images/drafts/${currentDraft.image}`" alt="project image">
        </div>
        <div class="project__stack">{{ currentDraft.stack }}</div>
        <div class="project__description">
          <p v-html="currentDraft.description"></p>
          <p>Which I participated in:</p>
          <ul>
            <li v-for="detail in currentDraft.details" :key="detail">{{ detail }}</li>
          </ul>
          <a v-if="currentDraft.link" :href="currentDraft.link" target="_blank">to project</a>
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
      overflow: hidden;
      grid-area: image;
      filter: grayscale(1);

      img {
        width: 100%;
        object-fit: cover;

        + img {
          display: none;
        }

        @include tablet {
          display: none;

          + img {
            display: block;
          }
        }
      }
    }

    &__stack {
      visibility: hidden;
      padding: 1rem .5rem;
      background: #D9D9D9;
      grid-area: stack;
      font-size: 1.4rem;
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
      visibility: hidden;
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
            font-weight: 700;
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

      a {
        margin-left: -.5rem;
        padding: 1rem;
        font-weight: 700;
        color: var(--black);
        display: inline-block;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    &__stack, &__description {
      position: relative;

      &::before {
        @include noise;
        z-index: 0;
      }
    }

    @include tablet {
      grid-template-areas:
        "image"
        "stack"
        "description";
    }
  }
}
</style>