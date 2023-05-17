<template>
  <div :class="['s-tab-selectors', { 's-tab-selectors-filled': isFilled }]">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const isFilled = inject('STabType');
</script>

<style lang="scss" scoped>
@import './STabSelectors.scss';
</style>
