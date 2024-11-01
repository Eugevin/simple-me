<script setup lang="ts">
defineProps<{
  words: string[]
}>()
</script>

<template>
  <div class="fastline">
    <ul v-for="i in 2" class="words">
      <li class="words__item" v-for="word in words" :key="word">{{ word }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.fastline {
  background: var(--white);
  color: var(--black);
  width: 100%;
  display: flex;

  .words {
    display: flex;
    animation: fastlineAnimation 20s linear infinite;

    &__item {
      line-height: 1.5;
      padding: 0 .5rem;
    }
  }
}

@keyframes fastlineAnimation {
  to {
    transform: translateX(-100%);
  }
}
</style>