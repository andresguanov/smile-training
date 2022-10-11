<!-- TODO: cambiar animacion a transition de vue -->
<template>
  <li class="sm-accordion-item" v-sm-option.target="uid">
    <slot></slot>
  </li>
</template>

<script lang="ts" setup>
import { inject, getCurrentInstance, provide, Ref } from 'vue'
import { SmOption as vSmOption } from '../../directives'

const props = defineProps<{ selected?: boolean }>()

const selected = inject('selected') as Ref<String>

const uid = (getCurrentInstance()?.uid as number).toString()

provide('uid', uid)

if (props.selected) {
  selected.value = uid
}
</script>

<style lang="scss" scoped>
@import './SmAccordionItem.scss';
</style>
