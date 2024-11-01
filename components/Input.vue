<script setup lang="ts">
defineProps<{
  type?: 'button'
}>()
</script>

<template>
  <button v-if="type === 'button'">
    <slot />
  </button>
  <input v-else type="text">
</template>

<style scoped lang="scss">
button {
  outline: none;
  background: none;
  font-size: 1.5rem;
  border: 4px solid var(--white);
  padding: .5rem 1rem;
  display: inline-block;
  color: var(--white);
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    color: var(--black);
    background: var(--white);
  }
}
</style>