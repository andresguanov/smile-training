<template>
  <div class="sm-container">
    <label :class="{ 'inline-input': labelAlignment !== 'top' }">
      <div
        v-if="!!label || help || $slots.help"
        :class="[
          'label-container',
          labelContainerClass,
          {
            'align-left': labelAlignment === 'left',
            'align-right': labelAlignment === 'right'
          }
        ]"
      >
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
      <slot name="before"></slot>
      <textarea
        ref="textarea"
        :disabled="disabled"
        :class="[
          sizeClass,
          shapeClass,
          {
            disabled: disabled || loading,
            'is-full-width': block,
            'has-error': error,
            resizable: resizable
          },
          textareaClass
        ]"
        :style="textareaStyle"
        v-bind="$attrs"
        :value="value"
        v-on="{
          input: event => $emit('input', event.target.value)
        }"
        :rows="rows"
      />
      <sm-icon v-if="error && showErrorIcon" icon="info" :class="['icon-error', sizeClass]" />
      <slot name="after"></slot>
      <!-- </div> -->
    </label>
    <p v-if="!!hint" :class="['hint', 'is-small', hintClass, { disabled }]" v-html="hint"></p>
  </div>
</template>

<script>
import stateMixin from "../../mixins/stateMixin"
import shapeMixin from "../../mixins/shapeMixin"
import sizeMixin from "../../mixins/sizeMixin"
import smIconHelp from "../Icon/IconHelp"
import smIcon from "../Icon/Icon"

export default {
  name: "sm-textarea",
  inheritAttrs: false,
  mixins: [stateMixin, shapeMixin, sizeMixin],
  components: {
    smIcon,
    smIconHelp
  },
  props: {
    //textarea props
    resizable: {
      type: Boolean,
      default: false
    },
    rows: {
      type: [Number, String],
      default: 2
    },
    labelAlignment: {
      type: String,
      default: "top"
    },
    //general input props
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
    textareaClass: {
      type: String,
      default: ""
    },
    textareaStyle: {
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
    showErrorIcon: {
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
    }
  },
  mounted() {
    this.focus && this.$refs.textarea.focus()
  }
}
</script>

<style lang="scss" scoped>
.sm-container textarea:disabled {
  background-color: rgb(241, 241, 241);
  cursor: not-allowed;
}
.sm-container .label.has-error {
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
.icon-error {
  color: #e85e42;
  &:hover {
    color: #e85e42;
  }
}

.label-container {
  display: flex;
  align-items: center;
  min-height: 22px;
}
label.inline-input {
  display: flex;
}
.align-left {
  justify-content: flex-start;
  text-align: left;
  margin: 5px auto;
  align-items: flex-start;
}
.align-right {
  text-align: right;
  margin: 5px 15px 5px auto;
  justify-content: flex-end;
  align-items: flex-start;
}

@media screen and (max-width: 480px) {
  .align-left,
  .align-right {
    text-align: left;
    margin: 5px auto;
    justify-content: flex-start;
  }

  label.inline-input {
    display: block;
  }
}
</style>
