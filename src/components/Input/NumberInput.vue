<template>
  <sm-input
    :value="value"
    size="small"
    :min="min"
    input-style="width: 100%; min-width: unset;"
    @input="$emit('input', $event)"
    v-bind="$attrs"
  >
    <template #afterInside>
      <div class="input-number-controls">
        <sm-icon class="control-up" icon="caret-up" size="small" @click="increment" />
        <sm-icon class="control-down" icon="caret-down" size="small" @click="decrement" />
      </div>
    </template>
    <template #after><slot name="after" /></template>
    <template #before><slot name="before" /></template>
    <template #beforeInside><slot name="before-inside" /></template>
    <template #help><slot name="help" /></template>
  </sm-input>
</template>

<script>
import SmInput from "./Input"
import SmIcon from "../Icon/Icon"
export default {
  components: {
    SmInput,
    SmIcon
  },
  props: {
    value: {
      type: [Number, String],
      default: ""
    },
    min: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {
    decrement() {
      this.$emit("input", Number(this.value) - 1)
      this.$emit("increment")
    },
    increment() {
      this.$emit("input", Number(this.value) + 1)
      this.$emit("increment")
    }
  }
}
</script>

<style lang="scss" scoped>
.input-number-controls {
  display: flex;
  flex-direction: column;
  position: relative;
  .control-up,
  .control-down {
    position: absolute;
    right: -6px;
    cursor: pointer;
  }
  .control-up {
    top: -5px;
  }
  .control-down {
    top: 7px;
  }
}
</style>
