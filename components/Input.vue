<script setup lang="ts">
defineProps<{
  type?: 'button'
}>()
</script>

<template>
  <button v-if="type === 'button'">
    <span class="hoverable">
      <slot />
    </span>
  </button>
  <input v-else type="text">
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
  
  span {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      height: .08rem;
      width: 100%;
      opacity: 0;
      transform: translateY(-50%);
      background: var(--white);
      transition: var(--transition);
    }
  }

  &:hover span::before {
    opacity: 1;
  }
}
</style>