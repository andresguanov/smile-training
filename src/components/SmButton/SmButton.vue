<template>
  <component
    :is="tag"
    :disabled="disabled"
    :class="[
      'sm-button',
      `sm-button-${size}`,
      type && `sm-button-${type}`,
      {
        loading,
      },
    ]"
    :type="nativeType"
    v-bind="$attrs"
  >
    <span class="loading-icon" v-if="loading">
      <sm-icon :size="size" icon="loading" class="spin" />
    </span>
    <span class="sm-button-container" :style="{ visibility: loading ? 'hidden' : 'visible' }">
      <sm-icon v-if="iconLeft" :icon="iconLeft" :size="size" class="mr-1" />
      <slot></slot>
      <sm-icon v-if="iconRight" :icon="iconRight" :size="size" class="ml-1" />
    </span>
  </component>
</template>

<script lang="ts" setup>
import type { IconType } from '~/interfaces'
import SmIcon from '../SmIcon/SmIcon.vue'

withDefaults(
  defineProps<{
    loading?: boolean
    disabled?: boolean
    type?: 'primary' | 'secondary' | 'ghost' | 'text'
    size?: 'small' | 'large' | 'medium'
    nativeType?: 'button' | 'submit' | 'reset'
    tag?: 'button' | 'a' | 'router-link'
    iconLeft?: IconType
    iconRight?: IconType
  }>(),
  { nativeType: 'button', tag: 'button', size: 'medium' }
)

defineEmits(['click-left-icon', 'click-right-icon'])
</script>

<style scoped lang="scss" src="./SmButton.scss"></style>
