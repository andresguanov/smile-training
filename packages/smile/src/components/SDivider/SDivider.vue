<template>
  <div class="s-divider" :class="size">
    <div class="wrapper-hr">
      <hr />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: value => ['XS', 'SM', 'MD', 'LG', 'XL'].includes(value),
  },
});
</script>

<style scoped lang="scss" src="./SDivider.scss" />
