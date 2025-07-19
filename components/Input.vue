<script setup lang="ts">
defineProps<{
  type?: 'button'
}>()
</script>

<template>
  <button v-if="type === 'button'">
    <slot />
  </button>
  <input
    v-else
    type="text"
  >
</template>

<style scoped lang="scss">
button {
  outline: none;
  background: none;
  font-family: Poppins, Helvetica, sans-serif;
  font-size: 1.5rem;
  border: none;
  display: inline-block;
  color: var(--white);
  cursor: pointer;
  padding: .25rem 1rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    height: .08rem;
    width: 0;
    transform: translateY(-50%);
    mix-blend-mode: difference;
    background: var(--white);
    transition: var(--transition);
  }

  &:hover::before {
    animation: lineAnimation forwards var(--transition);
  }

  @keyframes lineAnimation {
    0% {
      height: .08rem;
      width: 0;
    }

    50% {
      height: .08rem;
      width: 100%;
    }

    100% {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
