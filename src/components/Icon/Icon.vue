<template>
  <svg
    :class="['icon', sizeClass, { primary, secondary, error, disabled }]"
    :style="{ '--color': color, '--iconHoverColor': hoverColor, ...fixedStyle }"
    v-bind="$attrs"
  >
    <use :xlink:href="iconUrl"></use>
  </svg>
</template>

<script>
import sizeMixin from "../../mixins/sizeMixin"
import smileIcons from "@alegradev/smile-icons/dist/smile-icons.svg"

export default {
  name: "sm-icon",
  inheritAttrs: false,
  mixins: [sizeMixin],
  data() {
    return {
      // svgIcon: null
      svgIcon: smileIcons
    }
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#999999"
    },
    hoverColor: {
      type: String,
      default: undefined
    },
    primary: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  async mounted() {
    // import(
    //   /* webpackChunkName: "svg-icons" */ `@alegradev/icons/dist/smile-icons.svg`
    // ).then(module => {
    //   this.svgIcon = module.default
    // })
    // console.log(this.svgIcon)
  },
  computed: {
    iconUrl() {
      return `${this.svgIcon}#${this.icon}`
    },
    fixedStyle() {
      // if width or height props are setted,
      if (this.width || this.height) {
        // if width is setted and not height
        if (this.width && !this.height) {
          // then return both W & H equal to W
          return {
            width: this.width,
            height: this.width
          }
        }
        // Oposite case, but with Height
        else if (!this.width && this.height) {
          return {
            width: this.height,
            height: this.height
          }
        }
      }
      return {}
    }
  }
}
</script>

<style lang="scss">
// For default value of this variable, set it at root level
:root {
  --iconHoverColor: #{$brand1};
}
</style>
<style lang="scss" scoped>
svg {
  color: var(--color);
}
.icon {
  outline: none;
}
// Variable could be specified as component level (and overwrite :root level)
.icon:hover {
  color: var(--iconHoverColor);
}
.primary {
  color: $brand1 !important;
}
.secondary {
  color: $brand2 !important;
}
.error {
  color: $brand7 !important;
}
.disabled {
  opacity: 0.5;
  color: #999999;
  &:hover {
    color: #999999;
  }
}
</style>
