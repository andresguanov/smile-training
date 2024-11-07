<template>
  <s-tooltip
    v-bind="$attrs"
    class="s-button"
    :tag="tag"
    :content="isOnlyIcon ? label : ''"
    :placement="tooltipPosition"
    :class="[size, type, emphasis, { 's-button--only-icon': isOnlyIcon }]"
    :disabled="disabled || loading"
    :loading="loading"
    :type="nativeType"
  >
    <sm-icon
      v-if="loading"
      icon="loading-spinner"
      type="primary"
      class="s-button__icon s-button__loading"
      :height="iconSize"
      :width="iconSize"
    />
    <sm-icon
      v-if="isOnlyIcon"
      :icon="onlyIcon"
      :height="iconSize"
      :width="iconSize"
      class="s-button__icon"
    />
    <slot v-else>
      <sm-icon v-if="iconLeft" :icon="iconLeft" :height="iconSize" :width="iconSize" />
      <span>{{ label }}</span>
      <sm-icon v-if="iconRight" :icon="iconRight" :height="iconSize" :width="iconSize" />
    </slot>
  </s-tooltip>
</template>

<script lang="ts" setup>
import type { IconType } from '../../interfaces';

const props = withDefaults(
  defineProps<{
    label?: string;
    tag?: 'button' | 'a' | 'router-link';
    nativeType?: 'button' | 'submit' | 'reset';
    size?: 'small' | 'medium' | 'large';
    type?: 'default' | 'destructive' | 'reversed' | 'ghost';
    emphasis?: 'filled' | 'subtle' | 'outline' | 'text';
    iconLeft?: IconType;
    iconRight?: IconType;
    loading?: boolean;
    disabled?: boolean;
    onlyIcon?: IconType;
    tooltipPosition?: 'top' | 'bottom';
  }>(),
  {
    tag: 'button',
    size: 'medium',
    nativeType: 'button',
    type: 'default',
    emphasis: 'filled',
    tooltipPosition: 'top',
  }
);

const iconSize = computed(() => (props.size === 'small' ? '16px' : '20px'));
const isOnlyIcon = computed(() => Boolean(props.onlyIcon));
</script>

<style lang="scss" src="./SButton.scss" scoped></style>
