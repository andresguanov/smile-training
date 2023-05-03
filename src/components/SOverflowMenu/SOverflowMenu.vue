<template>
  <div ref="menuEl" class="s-menu" :style="{ top, left, right, bottom }">
    <header class="s-menu__header"></header>
    <div class="s-menu__body">
      <slot />
    </div>
    <footer class="s-menu__footer"></footer>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    top?: string
    left?: string
    bottom?: string
    right?: string
    /**
     * Especifica la forma en la que se desencadenará el evento clickOutside.
     * Por defecto el evento se dispara usando capture.
     */
    bubbling?: boolean
  }>(),
  {}
)
const emit = defineEmits<{
  (event: 'clickOutside', value: PointerEvent): void
}>()

const menuEl = ref<HTMLDivElement | null>(null)

onClickOutside(menuEl, event => emit('clickOutside', event), { capture: !props.bubbling })
</script>

<style lang="scss" scoped src="./SOverflowMenu.scss"></style>
