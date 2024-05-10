<template>
  <div class="s-accordion-item-header" v-sm-option.toggle="uid">
    <div>
      <sm-icon class="s-accordion-item-icon" :icon="icon" />
      <slot></slot>
    </div>
    <sm-icon class="s-accordion-item-collapse" :icon="`chevron-${sel === uid ? 'up' : 'down'}`" />
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';
import { SmOption as vSmOption } from '../../directives';
import SmIcon from '../SmIcon/SmIcon.vue';
import type { IconType } from '../../interfaces';

const uid = inject('uid') as String;

const props = defineProps<{ selected?: boolean; icon: IconType }>();

const sel = inject('selected') as Ref<String>;

if (props.selected) {
  sel.value = uid;
}
</script>

<style lang="scss" src="./SAccordionItemHeader.scss" scoped></style>
