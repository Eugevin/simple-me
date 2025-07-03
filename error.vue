<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <div class="error">
    <div class="container">
      <h1>status {{ props.error?.statusCode }}</h1>
      <Input
        type="button"
        @click="navigateTo('/')"
      >
        Go to home ->
      </Input>
    </div>
  </div>
</template>

<style scoped lang="scss">
.error {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    margin-bottom: 1rem;
  }
}
</style>
