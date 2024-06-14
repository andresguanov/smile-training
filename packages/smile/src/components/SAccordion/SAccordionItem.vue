<!-- TODO: cambiar animacion a transition de vue -->
<template>
  <li class="sm-accordion-item" v-sm-option.target="uid">
    <s-accordion-item-header :icon="icon"> {{ title }} </s-accordion-item-header>
    <s-accordion-item-body :description="description">
      <slot></slot>
    </s-accordion-item-body>
  </li>
</template>

<script lang="ts" setup>
import { inject, getCurrentInstance, provide, Ref } from 'vue';
import { SmOption as vSmOption } from '../../directives';
import { IconType } from '../../interfaces';

const props = defineProps<{
  selected?: boolean;
  title: string;
  description: string;
  icon: IconType;
  name?: string;
}>();

const selected = inject('selected') as Ref<String>;

const uid = props.name ?? (getCurrentInstance()?.uid as number).toString();

provide('uid', uid);

if (props.selected) {
  selected.value = uid;
}
</script>

<style lang="scss" src="./SAccordionItem.scss" scoped></style>
