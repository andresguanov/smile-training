<template>
  <div class="sm-inner-loading">
    <div class="sm-inner-loading-content">
      <sm-progress-circle size="small" />
      <p v-if="loadingText">{{ loadingText }}...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  loadingText?: string
}>()
</script>

<style lang="scss" scoped>
@import './SmInnerLoading.scss';
</style>
