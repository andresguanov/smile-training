<template>
  <div
    :class="['sm-tab', { active }]"
    @click="sendClick"
    :style="`transform: translateX(${-scrolledValue}px)`"
  >
    <span>
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: "sm-tab",
  props: {
    id: {
      type: String,
      required: true
    },
    activeTab: {
      type: String,
      default: ""
    },
    scrolled: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    active() {
      return this.activeTab === this.id
    },
    scrolledValue() {
      return this.scrolled?.value ?? 0
    }
  },
  methods: {
    sendClick() {
      this.$emit("click", this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.sm-tab {
  background: #f2f4f8;
  height: 40px;
  display: flex;
  flex-shrink: 0 !important;
  justify-content: center;
  padding: 3px 16px;
  align-items: center;
  border: 1px solid white;
  color: $brand2;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  span {
    &::selection {
      background: #f2f4f8;
      color: $brand2;
    }
  }
  &.active {
    background: white;
    &::selection {
      background: white;
      color: $brand2;
    }
  }
}
</style>
