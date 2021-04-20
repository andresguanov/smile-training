<template>
  <div class="sm-container">
    <label>
      <div v-if="!!label || help || $slots.help" class="label-container">
        <span
          v-if="!!label"
          :class="[
            'label',
            `is-${size}`,
            labelClass,
            {
              'has-error': error,
              required
            }
          ]"
          v-html="label"
        ></span>
        <sm-icon-help v-if="help || $slots.help" :size="size">
          {{ help }}
          <slot v-if="!help" name="help" />
        </sm-icon-help>
      </div>

      <div class="input-wrapper">
        <select
          :disabled="disabled"
          :class="[
            sizeClass,
            shapeClass,
            selectClass,
            {
              disabled: disabled || loading,
              'is-full-width': block,
              'has-error': error
            }
          ]"
          v-bind="$attrs"
          :style="selectStyle"
          :value="value"
          v-on="{
            input: event => $emit('input', event.target.value)
          }"
        >
          <slot />
        </select>
      </div>
    </label>
    <p v-if="!!hint" :class="['hint', 'is-small', hintClass, { disabled }]">
      {{ hint }}
    </p>
  </div>
</template>

<script>
import stateMixin from "../../mixins/stateMixin"
import shapeMixin from "../../mixins/shapeMixin"
import sizeMixin from "../../mixins/sizeMixin"
import smIconHelp from "../Icon/IconHelp"

export default {
  name: "sm-select-simple",
  components: {
    smIconHelp
  },
  inheritAttrs: false,
  mixins: [stateMixin, shapeMixin, sizeMixin],
  props: {
    value: {
      type: [String, Number, Object],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    labelClass: {
      type: String,
      default: ""
    },
    selectClass: {
      type: String,
      default: ""
    },
    selectStyle: {
      type: String,
      default: ""
    },
    help: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: ""
    },
    hintClass: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.sm-container div.label.has-error {
  color: #e85e42;
}
.sm-container {
  display: inline-block;
}
.sm-container .hint {
  margin-bottom: 5px;
  &.disabled {
    opacity: 0.5;
  }
}
.input-wrapper {
  position: relative;
  display: inline-block;
}
.label-container {
  display: flex;
  align-items: center;
  min-height: 22px;
}

label {
  display: inline-block;
}
</style>
