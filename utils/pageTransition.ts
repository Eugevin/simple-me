import { animate } from 'motion'
import type { PageMeta } from '#app'
import { easeInOutExpo } from '~/static/easings'

const meta: PageMeta = {
  pageTransition: {
    name: 'page-transition',
    mode: 'out-in',
    onEnter: async (_el, done) => {
      document.body.style.overflow = 'visible'
      await animate('#transition', { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }, { duration: 1, easing: easeInOutExpo }).finished
      done()
    },
    onLeave: async (_el, done) => {
      animate('#transition h3', { scale: [1, 1.25] }, { duration: 3, easing: 'linear' })
      await animate('#transition', { visibility: 'visible', clipPath: ['polygon(0 0, 0 0, 0 100%, 0% 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'] }, { duration: 1, easing: easeInOutExpo }).finished
      done()
    },
    onAfterLeave() {
      window.scrollTo(0, 0)
    },
  },
}

export default meta.pageTransition
