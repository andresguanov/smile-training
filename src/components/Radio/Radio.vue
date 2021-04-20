<template>
  <span
    class="sm-container"
    :class="!$slots.default ? 'no-label' : ''"
    @click="$emit('click', !value)"
  >
    <label
      class="radio-button"
      :class="[
        sizeClass,
        {
          disabled: disabled || loading,
          'has-error': error,
          'is-full-width': block,
          'label-left': labelLeft
        }
      ]"
      ref="label"
      :for="$id('ARadio')"
      @click="focus"
      @keydown.prevent.enter="$refs.label.click()"
    >
      <input
        type="radio"
        ref="input"
        v-model="computedValue"
        :id="$id('ARadio')"
        :disabled="disabled"
        :name="name"
        :checked="value"
        :value="nativeValue"
        @click.stop
      />
      <span><slot /></span>
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
  name: "sm-radio",
  components: {
    smIconHelp
  },
  mixins: [stateMixin, sizeMixin, checkRadioMixin],
  props: {
    help: {
      type: String,
      default: ""
    },
    labelLeft: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.sm-container label.radio-button.has-error {
  color: #e85e42;
}
// .sm-container label.radio-button.has-error > span:after {
//   border-color: #e85e42;
// }
// .sm-container label.radio-button > input:checked ~ span:after {
//   border-color: #fff !important;
// }

.sm-container {
  display: inline-block;
}
.sm-container .hint {
  padding-left: 30px;
  margin-bottom: 5px;
  &.disabled {
    opacity: 0.5;
  }
}
.no-label {
  font-size: 0;
  .radio-button {
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
.radio-button.label-left {
  // padding-left: 0;
  // padding-right: 30px;
  > span {
    padding-left: 12px;
    padding-right: 30px;
  }
  > span:before {
    left: unset;
    right: 8px;
  }
  > input:checked ~ span:after {
    left: unset;
    right: 8px;
  }
  &.is-large > span:before {
    right: 5px;
  }
  &.is-large > input:checked ~ span:after {
    right: 5px;
  }
  &.is-small > span:before {
    right: 12px;
  }
  &.is-small > input:checked ~ span:after {
    right: 12px;
  }
}
</style>
