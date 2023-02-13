<template>
  <div class="sm-tab-content" v-sm-option.target="name">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { SmOption as vSmOption } from '../../directives'
defineProps<{ name: String }>()
</script>

<style lang="scss" scoped>
@import './SmTabContent.scss';
</style>
