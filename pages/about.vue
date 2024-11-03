<script setup lang="ts">
import { animate, inView, scroll } from 'motion';
import { easeInOutExpo } from '~/static/easings';

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tortor suscipit, tristique odio sed, posuere nisi. Praesent vel consequat arcu. Maecenas ut quam vehicula, ultricies dolor eget, pellentesque eros. Sed purus lorem, suscipit non leo vel, molestie placerat eros. Phasellus ut accumsan sapien. Nullam lacinia erat odio, eget dapibus dolor tincidunt non. Sed at laoreet erat. Pellentesque iaculis mi mi. Quisque ut arcu aliquet sem facilisis elementum sit amet quis nunc. Vestibulum ac viverra ante, hendrerit interdum leo. Pellentesque ac varius neque. Aliquam erat volutpat.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tortor suscipit, tristique odio sed, posuere nisi. Praesent vel consequat arcu. Maecenas ut quam vehicula, ultricies dolor eget, pellentesque eros. Sed purus lorem, suscipit non leo vel, molestie placerat eros. Phasellus ut accumsan sapien. Nullam lacinia erat odio, eget dapibus dolor tincidunt non. Sed at laoreet erat. Pellentesque iaculis mi mi. Quisque ut arcu aliquet sem facilisis elementum sit amet quis nunc. Vestibulum ac viverra ante, hendrerit interdum leo. Pellentesque ac varius neque. Aliquam erat volutpat.
        </p>
        <img data-speed="250" class="image image__me moving" src="/images/me.webp" alt="section image">
        <img data-speed="50" class="image image__me-cozy moving" src="/images/me-cozy.jpg" alt="section image">
      </section>
      <section>
        <h3>My Skills</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at tortor suscipit, tristique odio sed, posuere nisi. Praesent vel consequat arcu. Maecenas ut quam vehicula, ultricies dolor eget, pellentesque eros. Sed purus lorem, suscipit non leo vel, molestie placerat eros. Phasellus ut accumsan sapien. Nullam lacinia erat odio, eget dapibus dolor tincidunt non. Sed at laoreet erat. Pellentesque iaculis mi mi. Quisque ut arcu aliquet sem facilisis elementum sit amet quis nunc. Vestibulum ac viverra ante, hendrerit interdum leo. Pellentesque ac varius neque. Aliquam erat volutpat.
        </p>
        <p>
          <b>Frontend Skills:</b>
          <ul>
            <li>Simple frontend skills</li>
          </ul>
        </p>
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

    h3 {
      margin-bottom: 1rem;
    }

    p {
      max-width: 20rem;
      margin-bottom: 1rem;
    }
  }

  .image {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    pointer-events: none;
    position: absolute;
    will-change: transform opacity;
    top: 0;
    left: 50%;

    &__me {
      width: 15rem;
      rotate: 5deg;
    }

    &__me-cozy {
      width: 8rem;
      top: 40%;
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