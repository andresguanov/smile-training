<template>
  <sm-tooltip :content="comment" v-bind="$attrs">
    <slot></slot>
    <template v-if="!comment && hasSlot('content')" #content>
      <slot name="content"></slot>
    </template>
  </sm-tooltip>
</template>

<script lang="ts" setup>
// import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light-border.css'
import { Tippy as SmTooltip } from 'vue-tippy'

const slots = useSlots()
defineProps<{
  comment?: string
}>()
const hasSlot = (slotName: string) => {
  return slots[slotName] && typeof slots[slotName] === 'function'
}
</script>
