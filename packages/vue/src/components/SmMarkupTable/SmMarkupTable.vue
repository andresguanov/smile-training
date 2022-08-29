<template>
  <div class="sm-markup-table">
    <table :class="{ 'sm-markup-table-hoverable': hoverable }">
      <slot></slot>
    </table>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ hoverable?: boolean }>()
</script>

<style lang="scss" scoped>
@import './SmMarkupTable.scss';
</style>
