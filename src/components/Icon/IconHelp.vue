<template>
  <sm-tooltip
    class="help-icon"
    :placement="placement"
    :boundary="boundary"
    :interactive="interactive"
    v-bind="tooltipOptions"
  >
    <template v-slot:trigger>
      <sm-icon
        :icon="realIcon"
        class="the-icon"
        :width="calculatedSize"
        v-bind="$attrs"
        :color="color"
        :hoverColor="hoverColor"
      />
    </template>
    <span v-if="help" class="help-icon-description" v-html="help" />
    <span v-else class="help-icon-description">
      <template>
        <slot />
      </template>
    </span>
  </sm-tooltip>
</template>

<script>
import smIcon from "./Icon"
export default {
  name: "sm-icon-help",
  inheritAttrs: false,
  components: {
    smIcon
  },
  props: {
    help: {
      type: String,
      default: ""
    },
    placement: {
      type: String,
      default: "right"
    },
    boundary: {
      type: String,
      default: "window"
    },
    interactive: {
      type: Boolean,
      default: true
    },
    tooltipOptions: {
      type: Object,
      default: undefined
    },
    size: {
      type: String,
      default: "medium"
    },
    icon: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "help",
      validator: val => ["help", "info", ""].includes(val)
    },
    color: {
      type: String,
      default: "#00b19d"
    },
    hoverColor: {
      type: String,
      default: "#00b19d"
    }
  },
  computed: {
    realIcon() {
      if (this.icon !== "") return this.icon
      return this.type === "help" ? "help-outline" : "info"
    },
    calculatedSize() {
      switch (this.size) {
        case "small":
          return "22px"
        case "medium":
          return "24px"
        case "large":
          return "32px"
        default:
          return ""
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.help-icon {
  margin-left: 3px;
  // padding-top: 5px;
  z-index: 3;
  cursor: pointer;
  outline: none !important;
  display: inline-block;
  & :deep(> div) {
    outline: none;
  }
}
.help-icon-description {
  font-size: 11px;
  padding: 8px;
  letter-spacing: normal;
  display: block;
  line-height: 1;
  color: #444;
  cursor: default;
}
.the-icon {
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}
</style>
