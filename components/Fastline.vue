<script setup lang="ts">
defineProps<{
  words: string[]
}>()
</script>

<template>
  <div class="fastline">
    <ul
      v-for="i in 2"
      :key="i"
      class="words"
    >
      <li
        v-for="word in words"
        :key="word"
        class="words__item"
      >
        {{ word }}
      </li>
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
    flex-direction: row;
    animation: fastlineAnimation 20s linear infinite;

    &__item {
      line-height: 1.5;
      padding: 0 .5rem;
      white-space: nowrap;
    }
  }
}

@keyframes fastlineAnimation {
  to {
    transform: translateX(-100%);
  }
}
</style>
