<template>
  <div class="sm-accordion-item-header" v-sm-option.toggle="uid">
    <slot></slot>
    <sm-icon class="sm-accordion-item-collapse" :icon="`caret-${sel === uid ? 'up' : 'down'}`" />
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'
import { SmOption as vSmOption } from '../../directives'
import SmIcon from '../SmIcon/SmIcon.vue'

const uid = inject('uid') as String

const props = defineProps<{ selected?: boolean }>()

const sel = inject('selected') as Ref<String>

if (props.selected) {
  sel.value = uid
}
</script>

<style lang="scss" scoped>
@import './SmAccordionItemHeader.scss';
</style>
