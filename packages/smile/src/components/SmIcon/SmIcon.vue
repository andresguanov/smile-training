<template>
  <svg
    :class="['sm-icon', { disabled, fluid, hoverable: !!hoverColor }, type, size]"
    :style="{ width, height }"
  >
    <use :xlink:href="iconUrl"></use>
  </svg>
</template>

<script lang="ts" setup>
import type { IconType } from '../../interfaces';
import Icons from '@alegradev/smile-icons/dist/smile-icons.svg?raw';

const props = withDefaults(
  defineProps<{
    icon?: IconType;
    size?: 'small' | 'medium' | 'large' | 'huge';
    type?: 'primary' | 'secondary' | 'error';
    hoverColor?: string;
    disabled?: boolean;
    width?: string;
    height?: string;
    color?: string;
    /**
     * En caso de tener un contenedor con display flex usar esta prop.
     */
    fluid?: boolean;
  }>(),
  {
    size: 'medium',
    icon: 'help',
  }
);
const base64svg = computed(() => {
  const svgBlob = new Blob([Icons], { type: 'image/svg+xml;charset=utf-8' });
  return URL.createObjectURL(svgBlob);
});

const iconUrl = computed(() => `${base64svg.value}#${props.icon}`);
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
