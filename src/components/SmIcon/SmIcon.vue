<template>
  <svg
    :class="[
      size && `sm-icon-${size}`,
      type && `sm-icon-${type}`,
      { 'sm-icon-error': error },
      'sm-icon',
    ]"
  >
    <use :xlink:href="iconUrl"></use>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import smileIcons from '@alegradev/smile-icons/dist/smile-icons.svg'
import { icon } from '../../types'

const props = withDefaults(
  defineProps<{
    icon: icon
    size?: 'small' | 'large' | 'huge'
    type?: 'primary' | 'secondary'
    error?: boolean
  }>(),
  {
    icon: 'help',
  }
)

const iconUrl = computed(() => `${smileIcons}#${props.icon}`)
</script>

<style lang="scss" scoped>
@import './SmIcon.scss';
</style>
