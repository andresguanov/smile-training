<template>
  <label :class="['sm-container', { 'is-full-width': block }]">
    <div v-if="!!label || help || $slots.help" :class="['label-container', labelContainerClass]">
      <span
        v-if="!!label"
        :class="['label', sizeClass, labelClass, { required }]"
        v-html="label"
      ></span>
      <sm-icon-help v-if="help || $slots.help" :size="size">
        {{ help }}
        <slot v-if="!help" name="help" />
      </sm-icon-help>
    </div>
    <date-picker
      v-bind="$attrs"
      :value="value"
      :class="[sizeClass, { 'is-full-width': block }]"
      :format="format"
      :lang="$attrs.lang || lang"
      v-on="{
        // ...$listeners,
        input: changeValue
      }"
    />
  </label>
</template>

<script>
import DatePicker from "vue2-datepicker"
import sizeMixin from "../../mixins/sizeMixin"

import smIconHelp from "../Icon/IconHelp"

import "vue2-datepicker/index.css"
export default {
  name: "sm-datepicker",
  components: {
    DatePicker,
    smIconHelp
  },
  inheritAttrs: false,
  mixins: [sizeMixin],
  props: {
    help: {
      type: String,
      default: ""
    },
    format: {
      type: String,
      default: "DD/MM/YYYY"
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
    value: {
      type: Date
    },
    locale: {
      type: String,
      default: "es"
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lang: null
    }
  },
  watch: {
    locale() {
      this.lang = require(`vue2-datepicker/locale/${this.locale}`)
    }
  },
  methods: {
    changeValue(value) {
      this.$emit("input", value)
    }
  },
  created() {
    require(`vue2-datepicker/locale/${this.locale}`)
  }
}
</script>

<style lang="scss">
.is-full-width {
  width: 100% !important;
}
.mx-btn-text {
  border: 0 !important;
}
// $default-color: #556;
$primary-color: $brand1;
$input-hover-border-color: $brand1;
@import "~vue2-datepicker/scss/index.scss";
.mx-table {
  tr {
    height: unset;
  }
}
.mx-icon-calendar,
.mx-icon-clear {
  top: 40%;
}
.mx-datepicker.is-small {
  .mx-input {
    padding: 3px 8px;
    line-height: 18px;
    height: 26px;
    margin-bottom: 12px;
  }
  .mx-icon-calendar,
  .mx-icon-clear {
    top: 41%;
  }
}
.label-container {
  display: flex;
  align-items: center;
  min-height: 22px;
}
</style>
