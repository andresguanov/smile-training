<template>
  <div class="app_container">
    <p>{{ text }}</p>
    <s-modal :model-value="true" header-text="dasdasd" show-close-icon>
      <template #footer>
        <div>
          <button class="bg-black">abrir</button>
          <button class="bg-black">cerrar</button>
        </div>
      </template>
    </s-modal>
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
