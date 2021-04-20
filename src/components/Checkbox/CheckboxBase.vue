<template>
  <span class="sm-container" @click="$emit('click', !value)">
    <label
      class="checkbox"
      :class="[
        sizeClass,
        {
          disabled: disabled || loading,
          'has-error': error,
          'is-full-width': block,
          'label-left': labelLeft,
          required
        }
      ]"
      ref="label"
      :for="$id('ACheckbox')"
      @click="focus"
      @keydown.prevent.enter="$refs.label.click()"
    >
      <input
        type="checkbox"
        ref="input"
        v-model="computedValue"
        :id="$id('ACheckbox')"
        :indeterminate.prop="indeterminate"
        :disabled="disabled"
        :name="name"
        :checked="value"
        :value="nativeValue"
        :true-value="trueValue"
        :false-value="falseValue"
        @click.stop
      />
      <slot />
      <sm-icon-help v-if="help || $slots.help">
        {{ help }}
        <slot v-if="!help" name="help" />
      </sm-icon-help>
    </label>
    <p v-if="!!hint" :class="['hint', 'is-small', hintClass, { disabled }]">
      {{ hint }}
    </p>
  </span>
</template>

<script>
import stateMixin from "../../mixins/stateMixin"
import sizeMixin from "../../mixins/sizeMixin"
import checkRadioMixin from "../../mixins/checkRadioMixin"
import smIconHelp from "../Icon/IconHelp"
// TODO: typeMixin?

export default {
  name: "sm-checkbox-base",
  components: {
    smIconHelp
  },
  mixins: [stateMixin, sizeMixin, checkRadioMixin],
  props: {
    help: {
      type: String,
      default: ""
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean, Object, Array], //Function,
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean, Object, Array], //Function,
      default: false
    },
    labelLeft: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.sm-container label.checkbox.has-error {
  color: #e85e42;
}
// .sm-container label.checkbox.has-error > span:before {
//   border-color: #e85e42;
// }
// .sm-container label.checkbox.has-error > input:focus ~ span:before {
//   box-shadow: 0 0 0 2px #e85e42;
// }
// .sm-container label.checkbox > input:checked ~ span:before {
//   border-color: transparent !important;
// }
.sm-container {
  display: inline-block;
  .checkbox {
    cursor: pointer;
  }
}
.sm-container .hint {
  padding-left: 35px;
  margin-bottom: 5px;
  &.disabled {
    opacity: 0.5;
  }
}
.checkbox.label-left {
  padding-left: 0;
  padding-right: 30px;
  > span:before {
    left: unset;
    right: 13px;
  }
  > input:checked ~ span:after {
    left: unset;
    right: 15px;
  }
  &.is-large > span:before {
    right: 10px;
  }
  &.is-large > input:checked ~ span:after {
    right: 12px;
  }
  &.is-small > span:before {
    right: 15px;
  }
  &.is-small > input:checked ~ span:after {
    right: 17px;
  }
}
</style>
