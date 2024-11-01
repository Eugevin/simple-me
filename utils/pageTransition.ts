import type { PageMeta } from "#app"
import { animate } from "motion"
import { easeInOutExpo } from "~/static/easings"

const meta: PageMeta = {
  pageTransition: {
    name: 'page-transition',
    mode: 'out-in',
    onEnter: async (el, done) => {
      await animate('main > .transition', { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }, { duration: .5, easing: easeInOutExpo }).finished
      done()
    },
    onLeave: async (el, done) => {
      await animate('main > .transition', { visibility: 'visible', clipPath: ['polygon(0 0, 0 0, 0 100%, 0% 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'] }, { duration: .5, easing: easeInOutExpo }).finished
      done()
    }
  }
}

export default meta.pageTransition