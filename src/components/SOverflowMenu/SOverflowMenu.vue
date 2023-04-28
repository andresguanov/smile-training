<template>
  <div ref="menuEl" class="s-menu" :style="{ top: distance }">
    <header class="s-menu__header">
      <h4></h4>
    </header>
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
    items?: string[]
  }>(),
  { distance: '0px' }
)
if (!props.items?.length) {
  console.warn('Missing data in %citems', 'color: red;font-weight: bold;padding: 1px', 'prop.')
}
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
