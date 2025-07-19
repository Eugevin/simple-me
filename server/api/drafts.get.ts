import type { Draft } from '~/types'

const drafts: Draft[] = [
  {
    title: 'show me some',
    image: 'sms.webp',
    link: '',
    description: `<b>Show Me Some</b> is my author's project together with my wife, where I am the main <b>Backend and Frontend</b> developer. The project is a <b>visual novel</b> with a lot of ramifications in a gloomy setting of an alternative <b>Middle Ages</b>.`,
    details: [
      'Develop backend for game engine in Rust.',
      'Writing a branched script.',
      'Writing frontend using canvas.',
    ],
    stack: 'WebGL, Rust, TypeScript, Tauri',
  },
  {
    title: 'olumni chat',
    image: 'olumni.webp',
    link: 'https://olumni.ru/',
    description: '<b>Olumni Chat</b> is a UI-simple web application that allows you to <b>connect two or more people</b> in <b>audio calls</b> via <b>WebRTC</b> technology',
    details: [
      'Development of the frontend part of the application: flow control, audio processing via AudioContext, etc.',
      'Development of backend part for interactive chat and initial negotiation.',
      'Packaging the application in Docker and CI/CD setup.',
    ],
    stack: 'VueJS, TypeScript, ElysiaJS',
  },
  {
    title: 'r52.ru',
    image: 'r52.webp',
    link: 'https://r52.ru/',
    description: `<b>R52.RU</b> is a multi-service agency with <b>20 years of experience</b>. They're <b>design and provide</b> effective presence, support and <b>successful development</b> of online business.`,
    details: [
      'Layout of commercial projects.',
      'Edits on existing sites & fixing bugs.',
      'Working with Vue.js projects using VueX and VueRouter.',
    ],
    stack: 'JavaScript, TypeScript, VueJS',
  },
  {
    title: 'travelask',
    image: 'travelask.webp',
    link: 'https://travelask.ru/',
    description: `Worked on <b>improving site health, search engine optimization, and performance troubleshooting</b> (problems related to long drags and main thread locking up for a few seconds).`,
    details: [
      'Migration of existing functionality from VueJS to native class EcmaScript 6+.',
      'Optimizing already written code.',
    ],
    stack: 'VueJS, TypeScript, JavaScript, Nuxt',
  },
  {
    title: 'platinum ltd',
    image: 'platinum.webp',
    link: 'https://sidusheroes.com/',
    description: `I spent the first two months doing <b>"standard frontend"</b>, then moved to the SidusHeroes team and <b>developed multiplayer blockchain games</b> using <b>WebGL</b>.`,
    details: [
      'Writing frontend using Vue3 with Composition API, TypeScript and Pinia.',
      'Work with difficult Canvas and WebGL engines. Describing types for game entities.',
      'Work with blockchain arhitecture, making request and logic for "backendless" applications.',
      'Error handling caused by game engine, fix bugs, adding new and refactor old functional features.',
    ],
    stack: 'VueJS, Nuxt, WebGL, TypeScript',
  },
  {
    title: 'prog. product',
    image: 'pp.webp',
    link: 'https://ppr.ru/',
    description: `The first six months I was engaged in the <b>development of a highly loaded "Frontend as API" system</b>, after the removal of important tasks on the project was transferred to the <b>backend development</b> department on <b>ExpressJS/Nest.js</b>.`,
    details: [
      'Development of systems for user authorization with a system of roles, a large number of queries to the database through the UUID.',
      'Improved project code style, utilizing new techniques and implementing productivity approaches in frontend-server development.',
      'Writing WebAPI for multi-level data reconciliation, recalculations and working with map data.',
    ],
    stack: 'TypeScript, VueJS, NestJS, MongoDB',
  },
]

export default defineEventHandler((e) => {
  const filter = getQuery(e)

  if (filter.name) {
    return drafts.find(draft => draft.title === filter.name) ?? 404
  }

  return drafts
})
