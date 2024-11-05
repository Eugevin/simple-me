<script setup lang="ts">
import { animate, inView, scroll } from 'motion';
import { easeInOutExpo, easeOutBack } from '~/static/easings';

const frontendSkills: string[] = [
  'JavaScript/TypeScript ES6+',
  'Vue.js 3.0 with Composition API & Pinia/VueX',
  'WebRTC, WebSockets, JWT/Sessions',
  'WebGL, Canvas, Cocos2D, ThreeJS',
  'HTML5 and CSS3 - base of web'
]

const backendSkills: string[] = [
  'ExpressJS, SocketIO, NestJS (production experience), ElysiaJS',
  'NodeJS for simple I/O',
  'Nginx, MongoDB & PostgreSQL, Ubuntu (for based and advanced usage)'
]

const otherSkills: string[] = [
  'Docker',
  'VSCode (with extension batteries ofc)'
]

definePageMeta({ pageTransition })

async function scrollPage() {
  document.querySelectorAll<HTMLElement>('.about-page section').forEach(section => {
    const movingEls = section.querySelectorAll<HTMLElement>('.moving')!

    scroll(
      animate(info => {
        movingEls.forEach(moving => {
          const translate = info * Number(moving.dataset.translate || 0)
          const rotate = info * Number(moving.dataset.rotate || 0)

          moving.style.transform = `translate(0, ${translate}%) rotate(${rotate}deg)`
        })
      }),
      {
        target: section,
        offset: ["start end", "end start"]
      }
    )

    movingEls.forEach(moving => {
      inView(moving, () => {
        animate(moving, { scale: [0, 1] }, { duration: .8, easing: easeOutBack })

        return () => animate(moving, { scale: [1, 0] }, { duration: .8, easing: easeInOutExpo })
      }, { margin: '-200px 0px -200px 0px' })
    })
  })
}

useAnimations(scrollPage)
</script>

<template>
  <div class="about-page">
    <Header title="about me" />
    <div class="container">
      <section>
        <h3>My name is Eugene</h3>
        <p>
          I am Frontend development on Vanilla JS, TypeScript and Vue.js (primarly).
        </p>
        <p>
          On the whole, I'm just an ordinary guy from Nizhny Novgorod who somehow likes writing code since childhood. I write code at home, write code before going to bed, write code at my parents' cottage. I learned to write code with the help of the method: “WRITE CODE, READ DOCUMENTATION”.
        </p>
        <p>
          From time to time inspiration strikes and I want to make something of my own. So, for example, my <NuxtLink to="/project/olumni chat"><b class="hoverable">pet olumni project</b></NuxtLink> was born (WebRTC chat, built first on SFU and then on MESH architecture).
        </p>
        <img
          class="image image__me moving"
          data-translate="20"
          data-rotate="20"
          style="--motion-scale: 0"
          src="/images/me-cozy.jpg"
          alt="section image"
        >
      </section>
      <section>
        <h3>My Skills</h3>
        <p>
          I am a frontend developer, but also have experience in backend application development (commercial among others). It seems to me that you want to know more about me. Want to? Scroll down!
        </p>
        <p>
          <b>Frontend Skills:</b>
        </p>
        <ul>
          <li v-for="skill in frontendSkills" :key="skill">{{ skill }}</li>
          <img
            class="image image__cat moving"
            data-translate="50"
            data-rotate="20"
            style="--motion-scale: 0"
            src="/images/cat-frontend.jpg"
            alt="section image"
          >
        </ul>
        <p>
          <b>Backend Skills:</b>
        </p>
        <ul>
          <li v-for="skill in backendSkills" :key="skill">{{ skill }}</li>
          <img
            class="image image__cat moving"
            data-translate="50"
            data-rotate="-20"
            style="--motion-scale: 0"
            src="/images/cat-backend.jpg"
            alt="section image"
          >
        </ul>
        <p>
          <b>Other skills:</b>
        </p>
        <ul>
          <li v-for="skill in otherSkills" :key="skill">{{ skill }}</li>
          <img
            class="image image__cat moving"
            data-translate="50"
            style="--motion-scale: 0"
            src="/images/cat.webp"
            alt="section image"
          >
        </ul>
        <p>*I also write in Rust. I like it a lot, but I'm still too little expert in it... Well, I mean, I can set up Tauri, I can write a basic backend, but the complicated stuff is still complicated stuff for me.</p>
        <img
          class="image image__rick moving"
          data-translate="50"
          data-rotate="-50"
          style="--motion-scale: 0"
          src="/images/rick.png"
          alt="section image"
        >
        <img
          class="image image__code moving"
          data-translate="100"
          style="--motion-scale: 0"
          src="/images/code.svg"
          alt="section image"
        >
      </section>
      <div class="cv">
        <p>You can downlaod my CV using this button:</p>
        <Input type="button">Download</Input>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about-page {
  section {
    position: relative;
    padding-bottom: 2rem;

    h3, p, ul, li {
      position: relative;
      z-index: 1;
      mix-blend-mode: difference;
    }

    h3, p, ul {
      margin-bottom: 1rem;
      max-width: 20rem;
    }

    a:hover {
      text-decoration: underline;
    }
  }

  .image {
    scale: var(--motion-scale);
    filter: grayscale(1);
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 50%;

    &__me {
      width: 8rem;
      top: 20%;
      rotate: -5deg;
    }

    &__rick {
      left: 60%;
      width: 5rem;
      rotate: 10deg;
    }

    &__code {
      top: 5%;
      left: 75%;
      width: 5rem;
      rotate: 10deg;
    }

    &__cat {
      top: -50%;
      left: 100%;
      width: 10rem;
    }
  }

  .cv {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;

    button {
      text-transform: uppercase;
    }
  }
}
</style>