<template>
  <sm-tooltip :content="comment" v-bind="$attrs" theme="smile-next">
    <slot></slot>
    <template v-if="!comment && hasSlot('content')" #content>
      <slot name="content"></slot>
    </template>
  </sm-tooltip>
</template>

<script lang="ts" setup>
import 'tippy.js/dist/tippy.css';
import { Tippy as SmTooltip } from 'vue-tippy';

const slots = useSlots();
defineProps<{
  comment?: string;
}>();
const hasSlot = (slotName: string) => {
  return slots[slotName] && typeof slots[slotName] === 'function';
};
</script>

<style lang="scss" src="./SmTooltip.scss"></style>
