<script setup lang="ts">
import type { Draft, Page } from './types';

const pages: Page[] = [
  {
    link: '/',
    title: 'home'
  },
  {
    link: '/projects',
    title: 'projects'
  },
  {
    link: '/about',
    title: 'about me'
  },
  {
    link: '/contacts',
    title: 'contacts'
  }
]

const drafts: Draft[] = [
  {
    title: 'show me some',
    image: '/images/draft-sms.webp',
    link: '',
    description: `<b>Show Me Some</b> is my author's project together with my wife, where I am the main <b>Backend and Frontend</b> developer. The project is a <b>visual novel</b> with a lot of ramifications in a gloomy setting of an alternative <b>Middle Ages</b>.`,
    details: [
      'Develop backend for game engine in Rust.',
      'Writing a branched script.',
      'Writing frontend using canvas.'
    ],
    stack: 'WebGL, Rust, TypeScript, Tauri'
  },
  {
    title: 'olumni chat',
    image: '/images/draft-olumni.webp',
    link: 'https://olumni.ru/',
    description: '<b>Olumni Chat</b> is a UI-simple web application that allows you to <b>connect two or more people</b> in <b>audio calls</b> via <b>WebRTC</b> technology',
    details: [
      'Development of the frontend part of the application: flow control, audio processing via AudioContext, etc.',
      'Development of backend part for interactive chat and initial negotiation.',
      'Packaging the application in Docker and CI/CD setup.'
    ],
    stack: 'VueJS, TypeScript, ElysiaJS'
  },
  {
    title: 'r52.ru',
    image: '/images/draft-r52.webp',
    link: 'https://r52.ru/',
    description: `<b>R52.RU</b> is a multi-service agency with <b>20 years of experience</b>. They're <b>design and provide</b> effective presence, support and <b>successful development</b> of online business.`,
    details: [
      'Layout of commercial projects.',
      'Edits on existing sites & fixing bugs.',
      'Working with Vue.js projects using VueX and VueRouter.',
    ],
    stack: 'JavaScript, TypeScript, VueJS'
  },
  {
    title: 'travelask',
    image: '/images/draft-travelask.webp',
    link: 'https://travelask.ru/',
    description: `Worked on <b>improving site health, search engine optimization, and performance troubleshooting</b> (problems related to long drags and main thread locking up for a few seconds).`,
    details: [
      'Migration of existing functionality from VueJS to native class EcmaScript 6+.',
      'Optimizing already written code.'
    ],
    stack: 'VueJS, TypeScript, JavaScript, Nuxt'
  },
  {
    title: 'platinum ltd',
    image: '/images/draft-platinum.webp',
    link: 'https://sidusheroes.com/',
    description: `I spent the first two months doing <b>"standard frontend"</b>, then moved to the SidusHeroes team and <b>developed multiplayer blockchain games</b> using <b>WebGL</b>.`,
    details: [
      'Writing frontend using Vue3 with Composition API, TypeScript and Pinia.',
      'Work with difficult Canvas and WebGL engines. Describing types for game entities.',
      'Work with blockchain arhitecture, making request and logic for "backendless" applications.',
      'Error handling caused by game engine, fix bugs, adding new and refactor old functional features.'
    ],
    stack: 'VueJS, Nuxt, WebGL, TypeScript'
  },
  {
    title: 'prog. product',
    image: '/images/draft-pp.webp',
    link: 'https://ppr.ru/',
    description: `The first six months I was engaged in the <b>development of a highly loaded "Frontend as API" system</b>, after the removal of important tasks on the project was transferred to the <b>backend development</b> department on <b>ExpressJS/Nest.js</b>.`,
    details: [
      'Development of systems for user authorization with a system of roles, a large number of queries to the database through the UUID.',
      'Improved project code style, utilizing new techniques and implementing productivity approaches in frontend-server development.',
      'Writing WebAPI for multi-level data reconciliation, recalculations and working with map data.'
    ],
    stack: 'TypeScript, VueJS, NestJS, MongoDB'
  },
]

provide('pages', pages)
provide('drafts', drafts)
</script>

<template>
  <Cursor />
  <main>
    <NuxtPage />
    <div class="transition">
      <h2>{{ pages.find(page => page.link === $route.path)?.title ?? $route.path.split('/').at(-1) }}</h2>
    </div>
  </main>
  <Footer />
</template>

<style scoped lang="scss">
.transition {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
  visibility: hidden;
  background: var(--black);
  z-index: 99;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: url('/images/bg.png');
    opacity: 0.5;
    z-index: -1;
  }
}
</style>