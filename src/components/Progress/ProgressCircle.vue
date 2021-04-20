<template>
  <div
    v-if="showPercentage"
    :class="[
      'progress-circle',
      { 'show-percentage': showPercentage },
      sizeClass,
      { full: percentage === 100 }
    ]"
    :data-percentage="percentage"
  />
  <div v-else :class="['progress-circle', sizeClass]" />
</template>

<script>
import sizeMixin from "../../mixins/sizeMixin"
export default {
  name: "sm-progress-circle",
  mixins: [sizeMixin],
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    showPercentage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    percentage() {
      if (this.max == 100) {
        return this.value
      }
      return parseInt((this.value * 100) / this.max)
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-circle {
  display: inline-block;
  &.show-percentage {
    &::after {
      position: absolute;
      content: attr(data-percentage) "%";
      color: #808080;
    }
    &.is-small::after {
      left: 20px;
      top: 31%;
      font-size: 0.8rem;
    }
    &.is-medium {
      &::after {
        left: -11px;
        top: 30%;
        font-size: 0.8rem;
      }
      &.full::after {
        left: -15px;
      }
    }
    &.is-large {
      &::after {
        left: -23px;
        top: 34%;
        font-size: 1.6rem;
      }
      &.full::after {
        left: -31px;
      }
    }
  }
}
</style>
