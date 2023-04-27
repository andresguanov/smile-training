<template>
  <div ref="menuEl" class="s-menu" :style="{ top: distance }">
    <header class="s-menu__header"></header>
    <div class="s-meny__body"></div>
    <footer class="s-menu__footer"></footer>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /**
     * La distancia del menú con respecto a su contenedor padre
     */
    distance?: string
  }>(),
  { distance: '0px' }
)
const emit = defineEmits<{
  (event: 'clickOutside', value: PointerEvent): void
}>()

const menuEl = ref<HTMLDivElement | null>(null)

onClickOutside(menuEl, event => emit('clickOutside', event))
</script>

<style lang="scss" scoped>
.s-menu {
  @apply absolute;
}
</style>
