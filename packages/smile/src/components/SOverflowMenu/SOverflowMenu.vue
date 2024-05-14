<template>
  <div ref="menuEl" class="s-menu" :style="{ top, left, right, bottom, maxHeight }">
    <header class="s-menu__header">
      <slot name="header" />
    </header>
    <div class="s-menu__body">
      <slot />
    </div>
    <footer class="s-menu__footer" v-if="$slots['footer']">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
    /**
     * Especifica la forma en la que se desencadenará el evento clickOutside.
     * Por defecto el evento se dispara usando capture.
     */
    bubbling?: boolean;
    /**
     * Permite detectar si el componente esta en un iframe o no, esta prop debería usarse
     * solo si esta seguro de que el componente vivirá dentro de un iframe para evitar
     * posibles errores.
     */
    detectIframe?: boolean;
    maxHeight?: string;
  }>(),
  { maxHeight: '352px' }
);
const emit = defineEmits<{
  (event: 'clickOutside', value: PointerEvent): void;
}>();

const menuEl = ref<HTMLDivElement | null>(null);

onClickOutside(menuEl, event => emit('clickOutside', event), {
  capture: !props.bubbling,
  detectIframe: props.detectIframe,
});
</script>

<style lang="scss" scoped src="./SOverflowMenu.scss"></style>
