<template>
  <div :class="['footer', { 'default-padding': defaultPadding }]" :style="paddingStyle">
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
.footer {
  &.default-padding {
    padding: 16px 24px 22px;
  }
}
</style>
