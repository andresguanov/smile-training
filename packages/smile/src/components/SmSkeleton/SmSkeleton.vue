<template>
  <div class="sm-skeleton">
    <div
      v-for="item in count"
      :key="item"
      :class="['sm-skeleton-item', `sm-skeleton-${shape}`]"
      :style="{ width, height: shape === 'circle' ? width : height }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
// TODO: agregas resto de estructuras:
// avatar, imagen, parrafo, mosaico

withDefaults(
  defineProps<{
    shape?: 'circle' | 'rectangle'
    count?: number
    width?: string
    height?: string
  }>(),
  { shape: 'rectangle', count: 1 }
)

/*
const components = props.structure.trim().split(',')

const bones = props.components?.map(({ type, count }) => {
  return {
    type,
    count: parseInt(count) || 1,
  }
})
*/
</script>

<style lang="scss" scoped>
@import './SmSkeleton.scss';
</style>
