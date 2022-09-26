<template>
  <div class="sm-modal-header">
    <div>
      <slot></slot>
    </div>
    <button class="ml-auto" @click="emit('close')">
      <sm-icon icon="close"></sm-icon>
    </button>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['close'])
</script>
