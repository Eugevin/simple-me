<script setup lang="ts">
import { animate, inView, scroll } from 'motion';
import { easeInOutExpo } from '~/static/easings';

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
  'Docker',
  'Nginx, MongoDB & PostgreSQL, Ubuntu (for based and advanced usage)'
]

definePageMeta({ pageTransition })

async function scrollPage() {
  document.querySelectorAll<HTMLElement>('.about-page section').forEach(section => {
    const movingEls = section.querySelectorAll<HTMLElement>('.moving')!

    scroll(
      animate(info => {
        movingEls.forEach(moving => {
          const progress = info * Number(moving.dataset.speed || 100)

          moving.style.transform = `translate(0, ${progress}%)`
        })
      }),
      {
        target: section,
        offset: ["start end", "end start"]
      }
    )

    movingEls.forEach(moving => {
      inView(moving, () => {
        animate(moving, { clipPath: ['polygon(0 0, 100% 0, 100% 0, 0 0)', 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'] }, { duration: 1, easing: easeInOutExpo })
      }, { margin: '0px 0px -250px 0px' })
    })
  })
}

onMounted(() => {
  scrollPage()
})
</script>

<template>
  <div class="about-page">
    <Header title="about" />
    <div class="container">
      <section>
        <h3>My name is Eugene</h3>
        <p>
          I am Frontend development on Vanilla JS, TypeScript and Vue.js (primarly).
        </p>
        <p>
          On the whole, I'm just an ordinary guy from Nizhny Novgorod who somehow likes writing code since childhood. I write code at home, write code before going to bed, write code at my parents' cottage. I learned to write code with the help of the method: “WRITE CODE, READ DOCUMENTATION”. From time to time inspiration strikes and I want to make something of my own. So, for example, my <NuxtLink to="/project/olumni chat"><b class="hoverable">pet olumni project</b></NuxtLink> was born (WebRTC chat, built first on SFU and then on MESH architecture).
        </p>
        <img data-speed="50" class="image image__me moving" src="/images/me-cozy.jpg" alt="section image">
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
        </ul>
        <p>
          <b>Backend Skills:</b>
        </p>
        <ul>
          <li v-for="skill in backendSkills" :key="skill">{{ skill }}</li>
        </ul>
        <p>*I also write in Rust. I like it a lot, but I'm still too little expert in it... Well, I mean, I can set up Tauri, I can write a basic backend, but the complicated stuff is still complicated stuff for me.</p>
        <img data-speed="200" class="image image__skills moving" src="/images/draft-pp.webp" alt="section image">
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
  }

  .image {
    filter: grayscale(1);
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    pointer-events: none;
    position: absolute;
    will-change: transform opacity;
    top: 0;
    left: 50%;

    &__me {
      width: 8rem;
      top: 20%;
      rotate: -5deg;
    }

    &__skills {
      left: 60%;
      width: 10rem;
      rotate: 10deg;
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