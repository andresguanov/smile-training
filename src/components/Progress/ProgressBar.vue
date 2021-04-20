<template>
  <progress
    v-if="showPercentage"
    max="100"
    :value="percentage"
    v-tooltip
    :content="`${percentage}%`"
  />
  <progress v-else max="100" :value="percentage" />
</template>

<script>
export default {
  name: "sm-progress-bar",
  props: {
    value: {
      type: [Number, String],
      required: true
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
