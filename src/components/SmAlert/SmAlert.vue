<template>
  <li :class="['sm-alert', `sm-alert-${type}`]">
    <div class="sm-alert-content">
      <sm-icon size="large" :class="`sm-alert-icon sm-alert-icon-${type}`" :icon="icons[type]" />
      <div class="sm-alert-message">
        <p v-if="title" class="sm-alert-title" v-html="title" />
        <p v-html="message" />
      </div>
    </div>
    <sm-icon size="large" class="sm-alert-close" icon="close" @click="$emit('close')" />
  </li>
</template>

<script lang="ts" setup>
import type { IconType } from '../../types'
import SmIcon from '../SmIcon/SmIcon.vue'

// TODO: pasar a un archivo de typos cuando importacion de tipos este disponible
type variant = 'success' | 'error' | 'warning' | 'info'

type alert = {
  title?: string
  message: string
  type?: variant
  time?: number
  persistent?: boolean
}

const emit = defineEmits(['close'])

const props = withDefaults(defineProps<alert>(), {
  type: 'success',
  time: 7500,
})

const icons: Record<variant, IconType> = {
  error: 'info',
  success: 'success',
  warning: 'info',
  info: 'info',
}

const timeOutCallback = ref<number | null>(null)

onMounted(() => {
  if (!props.persistent) {
    timeOutCallback.value = window.setTimeout(() => emit('close'), props.time)
  }
})
onBeforeUnmount(() => {
  if (timeOutCallback.value) {
    window.clearTimeout(timeOutCallback.value)
  }
})
</script>

<style lang="scss" scoped>
@import './SmAlert.scss';
</style>
