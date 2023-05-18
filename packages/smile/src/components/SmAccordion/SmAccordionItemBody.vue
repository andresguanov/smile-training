<template>
  <div class="sm-accordion-item-body" v-sm-option.target="uid">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { SmOption as vSmOption } from '../../directives';
const uid = inject('uid') as String;
</script>

<style lang="scss" scoped>
@import './SmAccordionItemBody.scss';
</style>
