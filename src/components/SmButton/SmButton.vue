<template>
  <component
    :is="tag"
    :disabled="disabled"
    :class="[
      type && `sm-button-${type}`,
      size && `sm-button-${size}`,
      'sm-button',
      {
        loading,
      },
    ]"
    :type="nativeType"
    v-bind="$attrs"
  >
    <span class="loading-icon" v-if="loading">
      <sm-icon icon="loading" class="spin" />
    </span>
    <span :style="{ visibility: loading ? 'hidden' : 'visible' }">
      <slot></slot>
    </span>
  </component>
</template>

<script lang="ts" setup>
import SmIcon from '../SmIcon/SmIcon.vue'

withDefaults(
  defineProps<{
    loading?: boolean
    disabled?: boolean
    type?: 'primary' | 'secondary' | 'ghost' | 'text'
    size?: 'small' | 'large'
    nativeType?: 'button' | 'submit' | 'reset'
    tag?: 'button' | 'a' | 'router-link'
  }>(),
  { nativeType: 'button', tag: 'button' }
)
</script>

<style scoped lang="scss">
@import './SmButton.scss';
</style>
