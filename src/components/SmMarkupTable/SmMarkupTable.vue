<template>
  <div class="sm-markup-table">
    <table :class="{ 'sm-markup-table-hoverable': hoverable, 'sm-markup-table-fixed': isFixed }">
      <slot></slot>
    </table>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ hoverable?: boolean; isFixed?: boolean }>()
</script>

<style lang="scss" scoped>
@import './SmMarkupTable.scss';
</style>
