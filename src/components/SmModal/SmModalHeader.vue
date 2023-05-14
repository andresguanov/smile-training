<template>
  <div class="sm-modal-header">
    <div>
      <slot></slot>
    </div>
    <div class="ml-auto" @click="emit('close')">
      <sm-icon icon="close"></sm-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['close'])
</script>
