<script setup lang="ts">
import { animate, stagger } from 'motion'
import { clipPaths } from '~/static/clipPaths'
import { easeInOutExpo, easeOutBack } from '~/static/easings'
import type { Page } from '~/types'

definePageMeta({ pageTransition })

const pages = useState<Page[]>('pages')

const profileTitleEls = ref<HTMLElement[]>([])
const profileImageEl = ref<HTMLElement>()

useAnimations(() => {
  const defaultShift: string = '.5'

  animate(profileTitleEls.value,
    {
      visibility: 'visible',
      opacity: [0, 1],
      transform: [
        `translate3d(-${defaultShift}rem, 0, 0) scale(${defaultShift})`,
        '',
      ],
    },
    {
      delay: stagger(0.05),
      easing: easeOutBack,
    })
  animate(profileImageEl.value!,
    {
      visibility: 'visible',
      clipPath: clipPaths.toRight,
    },
    {
      duration: 1,
      easing: easeInOutExpo,
    })
})

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/images/me.webp',
    },
  ],
})
</script>

<template>
  <div class="index-page">
    <Fastline />
    <div class="container">
      <div class="profile">
        <figure class="profile__image">
          <figcaption>
            <h1>
              <span
                v-for="letter in 'Eugene Vinokurov'"
                :key="letter"
                ref="profileTitleEls"
                :data-letter="letter"
              >{{
                letter }}</span>
            </h1>
          </figcaption>
          <picture>
            <source
              media="(min-width: 2000px)"
              srcset="/images/me-4k.webp"
            >
            <img
              ref="profileImageEl"
              src="/images/me.webp"
              alt="profile photo"
            >
          </picture>
        </figure>
        <div class="profile__pages">
          <Input
            v-for="page in pages.filter(page => page.title !== 'home')"
            :key="page.title"
            type="button"
            @click="navigateTo(page.link)"
          >
            {{ page.title.toUpperCase() }}
          </Input>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-page {
  position: relative;

  .profile {
    margin-top: 1rem;

    &__image {
      margin-bottom: 1rem;

      figcaption {
        margin-bottom: inherit;

        span:not([data-letter=" "]) {
          display: inline-block;
        }
      }

      picture img {
        height: 10rem;
        width: 100%;
        object-fit: cover;
        object-position: 0 15%;
        filter: grayscale(1);
      }

      span,
      img {
        visibility: hidden;
      }
    }

    &__pages {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;

      >* {
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
      transform: rotate(360deg);  }
  }
}
</style>
