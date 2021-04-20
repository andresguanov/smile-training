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
              'has-error': error
            }
          ]"
          v-html="label"
        ></span>
        <sm-icon-help v-if="help || $slots.help" :size="size">
          {{ help }}
          <slot v-if="!help" name="help" />
        </sm-icon-help>
      </div>
    </label>
    <div :class="['button-group', { grow }]">
      <!-- TODO: Ver si se puede pasar a una versión con slots, y aplicar le concepto de Tabs (onMounted, set click listener)  -->
      <button
        v-for="(btn, i) in options"
        :key="$id(`btn-group_${i}`)"
        :class="[
          'button',
          sizeClass,
          {
            'is-primary': btn[valueField] === localValue,
            'side-border': i !== options.length - 1
          }
        ]"
        type="button"
        :value="btn[valueField]"
        @click="setValue"
        v-html="btn[textField]"
      />
      <!-- FIXME: add support for icons  -->

      <!--  <template v-if="!iconButton">
          <sm-icon v-if="!!iconLeft" :icon="iconLeft" :class="iconClass" />
          <img v-else-if="iconLeftSrc" class="icon left" :src="iconLeftSrc" />
          <template v-if="label">{{ label }}</template>
          <template v-else-if="$slots.default">
            <slot />
          </template>
          <sm-icon v-if="!!iconRight" :icon="iconRight" :class="iconClass" />
          <img v-else-if="iconRightSrc" class="icon right" :src="iconRightSrc" />
        </template>
        <template v-else>
          <sm-icon v-if="!!icon" :icon="icon" :class="iconClass" />
        </template> -->
    </div>
  </div>
</template>

<script>
import smIconHelp from "../Icon/IconHelp"

export default {
  name: "sm-button-group",
  components: { smIconHelp },
  props: {
    value: [String, Object, Number],
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ""
    },
    labelClass: {
      type: String,
      default: ""
    },
    help: {
      type: String,
      default: ""
    },
    grow: {
      type: Boolean,
      default: true
    },
    // sizeMixin:
    size: {
      type: String,
      default: "",
      validator: value => {
        return ["small", "medium", "large", ""].includes(value)
      }
    },
    // stateMixin:
    error: {
      type: Boolean,
      default: false
    },
    textField: {
      type: String,
      default: "text"
    },
    valueField: {
      type: String,
      default: "value"
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      }
    },
    sizeClass() {
      return this.size === "" ? "is-medium" : `is-${this.size}`
    }
  },
  methods: {
    setValue(event) {
      this.localValue = event.target.value
    }
  }
}
</script>

<style lang="scss" scoped>
.sm-container {
  padding-left: 5px;
}
.button-group {
  .button {
    border-radius: 0;
    border-right: 0;
    border-left: 0;

    border-style: solid;
    border-width: 0.5px;
    border-color: #e1e2e1;

    border-right-width: 0;
    border-left-width: 0;
    color: #58595f;

    &.side-border {
      border-right-width: 0.5px;
    }

    &.is-primary {
      border-color: #00b19d !important;
      color: #fff;
    }
  }

  &.grow {
    display: flex;
    .button {
      flex-grow: 1;
    }
  }

  :first-child {
    border-left-width: 0.5px;

    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  :last-child {
    border-right-width: 0.5px;

    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
</style>
