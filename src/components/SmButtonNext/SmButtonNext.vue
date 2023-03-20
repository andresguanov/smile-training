<template>
  <component
    :is="tag"
    v-bind="$attrs"
    class="sm-button"
    :class="[size, type, emphasis]"
    :disabled="disabled"
    :loading="loading"
    :type="nativeType"
  >
    <sm-icon
      v-if="loading"
      icon="loading"
      type="primary"
      :height="iconSize"
      :width="iconSize"
      class="sm-button__loading__icon"
    />
    <template v-else>
      <sm-icon :icon="iconLeft" :height="iconSize" :width="iconSize" />
      <span>Suscribirse</span>
      <sm-icon :icon="iconRight" :height="iconSize" :width="iconSize" />
    </template>
  </component>
</template>

<script lang="ts" setup>
import { IconType } from '~/interfaces'

const props = withDefaults(
  defineProps<{
    tag?: 'button' | 'a' | 'router-link'
    nativeType?: 'button' | 'submit' | 'reset'
    size?: 'small' | 'medium' | 'large'
    type?: 'default' | 'destructive' | 'reversed'
    emphasis?: 'filled' | 'subtle' | 'outline' | 'text'
    iconLeft?: IconType
    iconRight?: IconType
    loading?: boolean
    disabled?: boolean
  }>(),
  {
    tag: 'button',
    size: 'medium',
    nativeType: 'button',
    type: 'default',
    emphasis: 'filled',
  }
)

const iconSize = computed(() => (props.size === 'small' ? '16px' : '20px'))
</script>

<style lang="scss" src="./SmButtonNext.scss" scoped></style>
