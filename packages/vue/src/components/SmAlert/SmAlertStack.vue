<template>
  <transition-group
    tag="ul"
    class="sm-alert-stack"
    name="sm-alert-stack"
    @enter="onEnter"
    @leave="onLeave"
  >
    <sm-alert
      v-for="(alert, i) in alertStore.stack"
      :key="alert.id"
      v-bind="alert"
      @close="remove(i)"
    />
  </transition-group>
</template>

<script lang="ts" setup>
import { alertStore } from '../../store'
// import { useVModel } from '@vueuse/core'

// TODO: pasar a un archivo de typos cuando importacion de tipos este disponible
// export type variant = 'success' | 'error' | 'warning' | 'info'
/*
export type alert = {
  id?: number
  title?: string
  message: string
  type?: variant
  time?: number
  persistent?: boolean
}
*/
// const props = defineProps<{ modelValue: alert[] }>()

// const emit = defineEmits(['update:modelValue'])

// const stack = useVModel(props, 'modelValue', emit)

const exitTime = 750

function onEnter(el: Element, done: () => void) {
  el.classList.add('sm-alert-slide-in')
  setTimeout(() => done(), exitTime)
}

function onLeave(el: Element, done: () => void) {
  el.classList.add('sm-alert-slide-out')
  setTimeout(() => done(), exitTime)
}

function remove(index: number) {
  // if (index > -1) stack.value.splice(index, 1)
  alertStore.removeAlert(index)
}
/*
let next = 0

function getNextId() {
  next = next < 100 ? next + 1 : 0
  return next
}

watch(props, () => {
  stack.value.forEach(alert => {
    if (!alert?.id) {
      alert.id = getNextId()
      alert.time = alert?.time || 5000
      setTimeout(() => remove(stack.value.indexOf(alert)), alert.time)
    }
  })
})
*/
</script>

<style lang="scss" scoped>
.sm-alert-stack {
  @apply fixed right-0 top-0 w-96 pointer-events-none;
  @apply z-[100];
}

.sm-alert-stack-move,
.sm-alert-stack-enter-active,
.sm-alert-stack-leave-active {
  @apply transition-transform duration-500;
}

.sm-alert-stack-enter-from,
.sm-alert-stack-leave-to {
  @apply translate-x-96;
}

.sm-alert-stack-leave-active {
  @apply absolute;
}
</style>
