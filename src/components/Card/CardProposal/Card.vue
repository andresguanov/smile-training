<template>
  <div
    :class="['card', elevationClass, { 'inline-block': inline, 'default-width': width === '' }]"
    :style="widthStyle"
  >
    <card-header :no-padding="noPaddingHeader" :padding="paddingHeader">
      <template #header>
        <slot name="header" />
      </template>
      <template #actions>
        <slot name="header.actions" />
      </template>
    </card-header>
    <hr />
    <card-body :no-padding="noPaddingBody" :padding="paddingBody">
      <slot name="body" />
    </card-body>
    <hr />
    <card-footer :no-padding="noPaddingFooter" :padding="paddingFooter">
      <slot name="footer" />
    </card-footer>
  </div>
</template>

<script>
import CardHeader from "./CardHeader.vue"
import CardBody from "./CardBody.vue"
import CardFooter from "./CardFooter.vue"
export default {
  name: "sm-card-proposal",
  components: {
    CardHeader,
    CardBody,
    CardFooter
  },
  props: {
    elevation: [Number, String],
    inline: {
      type: Boolean,
      default: false
    },
    noPaddingHeader: {
      type: Boolean,
      default: false
    },
    noPaddingBody: {
      type: Boolean,
      default: false
    },
    noPaddingFooter: {
      type: Boolean,
      default: false
    },
    paddingHeader: {
      type: String,
      default: ""
    },
    paddingBody: {
      type: String,
      default: ""
    },
    paddingFooter: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: ""
    }
  },
  computed: {
    elevationClass() {
      switch (this.elevation) {
        case 1:
        case "1":
          return "shadow_small"
        case 2:
        case "2":
          return "shadow_medium"
        case 3:
        case "3":
          return "shadow_large"
        case 4:
        case "4":
          return "shadow_huge"
        default:
          return "shadow_medium"
      }
    },
    widthStyle() {
      return this.width ? { width: this.width } : undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #a9a9a94f;
  border-radius: 10px;
  // padding: 12px 20px;
  background-color: #fff;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
  // min-width: 480px;
  // &.large {
  //   box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25);
  // }
  &.default-width {
    width: 480px;
  }
}
.shadow_small {
  @include Shadow_small;
}
.shadow_medium {
  @include Shadow_medium;
}
.shadow_large {
  @include Shadow_large;
}
.shadow_huge {
  @include Shadow_huge;
}
</style>
