<template>
  <div :class="['header', { 'default-padding': defaultPadding }]" :style="paddingStyle">
    <div class="header">
      <slot name="header" />
    </div>
    <div class="actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
// import IconActions from "../IconActions.vue";
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
.header {
  display: flex;
  flex: 1;

  &.default-padding {
    padding: 24px 24px 13px;
  }

  .header {
    display: flex;
    flex: 10;
    font-size: 20px;
    color: #00b19d;
  }
  .actions {
    display: flex;
    flex: 2;
    flex-direction: row-reverse;
  }
}
</style>
