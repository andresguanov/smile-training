<template>
  <div class="sm-container">
    <label :class="{ 'inline-input': labelAlignment !== 'top' }">
      <div
        v-if="!!label || help || $slots.help"
        :class="[
          'label-container',
          labelContainerClass,
          { 'align-left': labelAlignment === 'left', 'align-right': labelAlignment === 'right' }
        ]"
      >
        <span
          v-if="!!label"
          :class="[
            'label',
            sizeClass,
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
      <!-- FIXME: REEMPLAZAR ESTO DE ACA ABAJO POR FLEXBOX https://css-tricks.com/flex-grow-is-weird/  PARA QUE LOS ICONOS QUEDEN BIEN A LOS COSTADOS -->
      <!-- <div> -->
      <div :class="['input-wrapper', inputContainerClass]">
        <div v-if="$slots.before" class="slot-before">
          <slot name="before"></slot>
        </div>
        <div
          :class="['input-wrapper-border', sizeClass, { ghost, 'has-error': error }]"
          :name="$id('input-wrapper')"
        >
          <div class="before-inside-slot" v-if="hasScopedSlot('before-inside')">
            <slot name="before-inside" :selectedOption="value" />
          </div>
          <input
            ref="input"
            :type="nativeType"
            :disabled="disabled"
            :class="[
              sizeClass,
              shapeClass,
              {
                disabled: disabled || loading,
                'is-full-width': block,
                'shrink-2': $slots.before && $slots.after,
                'shrink-1': !($slots.before && $slots.after) && ($slots.before || $slots.after),
                'shrink-inside-left': hasScopedSlot('before-inside'),
                'shrink-inside-right': hasScopedSlot('after-inside')
              },
              inputClass
            ]"
            :style="inputStyle"
            v-bind="$attrs"
            :value="value"
            v-on="{
              input: event => $emit('input', event.target.value)
            }"
          />
          <div class="after-inside-slot" v-if="hasScopedSlot('after-inside')">
            <slot name="after-inside" :selectedOption="value" />
          </div>
        </div>
        <div v-if="$slots.after" class="slot-after">
          <slot name="after"></slot>
        </div>

        <sm-tooltip
          v-if="!!error && showError"
          :to="$id('input-wrapper')"
          placement="right"
          boundary="window"
          :interactive="true"
        >
          <error-help-content :errorMessages="errorMessages" />
        </sm-tooltip>
        <!-- <sm-icon v-if="error && showErrorIcon" icon="info" :class="['icon-error', sizeClass]" /> -->
        <!-- <sm-icon-help v-if="error && showErrorIcon" type="info" class="error-help" :size="size">
          <error-help-content :errorMessages="errorMessages" />
        </sm-icon-help> -->
      </div>
      <!-- </div> -->
    </label>
    <p v-if="!!hint" :class="['hint', 'is-small', hintClass, { disabled }]" v-html="hint"></p>
  </div>
</template>

<script>
import stateMixin from "../../mixins/stateMixin"
import shapeMixin from "../../mixins/shapeMixin"
import sizeMixin from "../../mixins/sizeMixin"
import slotsMixin from "../../mixins/slotsMixin"
// import smIcon from "../Icon/Icon"
import smIconHelp from "../Icon/IconHelp"
import ErrorHelpContent from "../Icon/ErrorHelpContent"

export default {
  name: "sm-input",
  inheritAttrs: false,
  mixins: [stateMixin, shapeMixin, sizeMixin, slotsMixin],
  components: {
    // smIcon,
    smIconHelp,
    ErrorHelpContent
  },
  props: {
    nativeType: {
      type: String,
      default: "text"
    },
    value: {
      type: [String, Number],
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
    labelContainerClass: {
      type: String,
      default: ""
    },
    labelAlignment: {
      type: String,
      default: "top"
    },
    inputClass: {
      type: String,
      default: ""
    },
    inputContainerClass: {
      type: String,
      default: ""
    },
    inputStyle: {
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
    showError: {
      type: Boolean,
      default: true
    },
    focus: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    ghost: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.focus && this.$refs.input.focus()
  }
}
</script>

<style lang="scss" scoped>
.sm-container input:disabled {
  background-color: rgb(241, 241, 241);
  cursor: not-allowed;
}
.sm-container .label.has-error {
  color: $brand7;
}
.sm-container {
  display: inline-block;
  outline: 0;
  .slot-before {
    margin-right: 3px;
  }
  .slot-after {
    margin-left: 3px;
  }

  .slot-before,
  .slot-after,
  .help-icon.error-help {
    display: flex;
    align-self: center;
    margin-left: 2px;
  }

  .help-icon.error-help :deep(svg) {
    color: $brand7;
  }

  input {
    display: flex;
    flex: 1;
    &.shrink-2.shrink-1 {
      flex: 0.8;
    }
    &.shrink-1 {
      flex: 0.9;
    }
  }
}
.sm-container .hint {
  margin-bottom: 5px;
  &.disabled {
    opacity: 0.5;
  }
}

input[type="number"] {
  font-weight: 400;
  min-width: 100px;
  margin: 5px auto;
  background: #fff;
  border-radius: 5px;
  transition: all 0.2s;

  & ::placeholder,
  & ::-webkit-input-placeholder,
  & ::-moz-placeholder,
  & ::-ms-input-placeholder {
    color: #b3b3b3;
    opacity: 1;
  }

  &.is-small {
    font-size: 12px;
    font-weight: 400;
    padding: 3px 0 3px 8px;
    min-width: 80px;
    line-height: 18px;
  }
  &.is-medium {
    font-size: 14px;
    padding: 9px 0 9px 8px;
    line-height: 21px;
    margin-bottom: 12px;
  }
  &.is-large {
    font-size: 16px;
    padding: 12px 0 12px 8px;
    line-height: 24px;
    margin-bottom: 12px;
  }

  &:focus {
    // removes annoying outline showed in chrome:
    outline: 0;
  }
}

.input-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  margin: 5px 0 12px 0;
  align-items: center;

  > div.input-wrapper-border {
    display: flex;
    flex: 1;
    //
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;

    &:focus-within {
      border: 1px solid $brand1;
    }

    &.ghost {
      border: 1px solid transparent;
      &:focus-within {
        border: 1px solid $brand1;
      }
    }

    &.has-error {
      border: 1px solid $brand7;
    }

    .after-inside-slot,
    .before-inside-slot {
      display: inline-block;
      padding: 9px 6px;
    }
    > input {
      &.shrink-inside-left {
        padding-left: 0;
      }
      &.shrink-inside-right {
        padding-right: 0;
      }
      border: none;
      margin: 0;
    }

    /* &.is-large ~ .help-icon.error-help {
      padding-top: 16px;
      :deep(.icon) {
        width: 32px !important;
        height: 32px !important;
      }
    } */
  }

  > div.input-wrapper-border.is-small {
    // margin-bottom: 12px;

    .after-inside-slot,
    .before-inside-slot {
      padding: 3px 6px;
      font-size: 12px;

      p {
        font-size: 12px;
      }
    }
  }
  > div.input-wrapper-border.is-large {
    .after-inside-slot,
    .before-inside-slot {
      padding: 12px 6px;
      font-size: 16px;

      p {
        font-size: 16px;
      }
    }
  }
}

.label-container {
  display: flex;
  align-items: center;
  min-height: 22px;
}

// label {
//   display: inline-block;
// }

label.inline-input {
  display: flex;
}
.align-left {
  text-align: left;
  margin: 5px 15px 5px auto;
  justify-content: flex-start;
}
.align-right {
  text-align: right;
  justify-content: flex-end;
  margin: 5px 15px 5px auto;
}

@media screen and (max-width: 480px) {
  .align-left,
  .align-right {
    text-align: left;
    justify-content: flex-start;
    margin: 5px 15px 5px auto;
  }

  label.inline-input {
    display: block;
  }
}
</style>
