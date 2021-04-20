<template>
  <sm-checkbox-base
    :class="!$slots.default ? 'no-label' : ''"
    v-bind="$attrs"
    :value="value"
    @input="input"
    @click="click"
  >
    <span><slot /></span>
    <template v-slot:help>
      <slot name="help" />
    </template>
  </sm-checkbox-base>
</template>

<script>
import smCheckboxBase from "./CheckboxBase"

export default {
  name: "sm-checkbox",
  components: {
    smCheckboxBase
  },
  inheritAttrs: false,
  props: {
    value: [String, Number, Boolean, Object, Array] //Function,
  },
  methods: {
    input(value) {
      this.$emit("input", value)
    },
    click(value) {
      this.$emit("click", value)
    }
  }
}
</script>

<style lang="scss" scoped>
.no-label {
  font-size: 0;
  .checkbox {
    > span {
      min-height: 32px;
    }
    &.is-small > span {
      min-height: 26px;
    }
    &.is-large > span {
      min-height: 38px;
    }
  }
}
</style>
