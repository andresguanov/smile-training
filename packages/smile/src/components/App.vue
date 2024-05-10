<template>
  <div>
    <p>{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
const text = ref('Hello World');
</script>

<style lang="scss" scoped>
.app_container {
  @apply flex flex-col;
  @apply m-5;
  @apply max-w-5xl;
}
</style>
