<template>
  <li :class="['option', { selected }]" v-bind="$attrs">
    <slot>
      <sm-checkbox
        v-if="showCheckbox"
        :value="checked"
        size="small"
        @input="$emit('check', $event)"
      >
        {{ text }}
      </sm-checkbox>
      <template v-else>
        {{ text }}
      </template>
    </slot>
  </li>
</template>

<script>
import smCheckbox from "../Checkbox/Checkbox"
export default {
  inheritAttrs: false,
  components: {
    smCheckbox
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.grouped {
  padding-left: 16px !important;
}
</style>
