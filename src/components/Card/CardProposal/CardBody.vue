<template>
  <div :class="['body', { 'default-padding': defaultPadding }]" :style="paddingStyle">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    noPadding: {
      type: Boolean,
      default: false
    },
    padding: {
      type: String,
      default: ""
    }
  },
  computed: {
    defaultPadding() {
      return this.noPadding === false && this.padding === ""
    },
    paddingStyle() {
      return this.padding ? { padding: this.padding } : undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  min-height: 80px;

  &.default-padding {
    padding: 16px 24px;
  }
}
</style>
