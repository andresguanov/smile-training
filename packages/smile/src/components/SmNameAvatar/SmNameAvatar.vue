<template>
  <div class="sm-name-avatar">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name: string
}>()
</script>

<style lang="scss" scoped>
@import './SmNameAvatar.scss';
</style>
