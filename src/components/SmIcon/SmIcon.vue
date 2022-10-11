<template>
  <svg
    :class="['sm-icon', { disabled, hoverable: !!hoverColor }, type, size]"
    :style="{ width, height }"
  >
    <use :xlink:href="iconUrl"></use>
  </svg>
</template>

<script lang="ts" setup>
import smileIcons from '@alegradev/smile-icons/dist/smile-icons.svg'
import type { IconType } from '../../types'

const props = withDefaults(
  defineProps<{
    icon?: IconType
    size?: 'small' | 'medium' | 'large' | 'huge'
    type?: 'primary' | 'secondary' | 'error'
    hoverColor?: string
    disabled?: boolean
    width?: string
    height?: string
    color?: string
  }>(),
  {
    size: 'medium',
    icon: 'help',
  }
)

const iconUrl = computed(() => `${smileIcons}#${props.icon}`)
</script>

<style lang="scss" scoped>
.sm-icon {
  color: v-bind(color);
  &.hoverable {
    &:hover {
      color: v-bind(hoverColor);
    }
  }
}
@import './SmIcon.scss';
</style>
