<template>
  <div :class="['sm-tab-item', { active }]">
    <slot />
  </div>
</template>

<script>
export default {
  name: "sm-tab-item",
  props: {
    activeTab: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    active() {
      return this.activeTab === this.value
    }
  }
}
</script>

<style lang="scss" scoped>
.sm-tab-item {
  width: 100%;
  display: none;
  &.active {
    display: block;
  }
}
</style>
