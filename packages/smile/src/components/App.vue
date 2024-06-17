<template>
  <div class="app_container">
    <p>{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
const text = ref('Hello World');
</script>

<style lang="scss" scoped>
.app_container {
  @apply flex flex-col p-4;
}
</style>
