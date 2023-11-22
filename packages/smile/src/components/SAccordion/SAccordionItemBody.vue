<template>
  <div class="sm-accordion-item-body" v-sm-option.target="uid">
    <div class="sm-accordion-item-body-description">
      {{ description }}
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { SmOption as vSmOption } from '../../directives';
const uid = inject('uid') as String;

defineProps<{
  description: string;
}>();
</script>

<style lang="scss" src="./SAccordionItemBody.scss" scoped></style>
