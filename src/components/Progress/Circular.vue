<template>
  <div
    class="bordered"
    :style="{ backgroundImage: backgroundImage }"
    :data-percentage="percentage"
  ></div>
</template>
<script>
export default {
  name: "sm-progress-circular",
  props: {
    percentage: {
      type: Number,
      required: false,
      default: 80
    }
  },
  data() {
    return {}
  },
  computed: {
    calculatedPercentage() {
      return this.percentage * 3.6
    },
    backgroundImage() {
      if (this.calculatedPercentage < 180) {
        return (
          "linear-gradient(" +
          (90 + this.calculatedPercentage) +
          "deg, transparent 50%, #f4f5fb 50%), linear-gradient(90deg, #f4f5fb 50%, transparent 50%)"
        )
      } else {
        return (
          "linear-gradient(" +
          (this.calculatedPercentage - 90) +
          "deg, transparent 50%, #01c8b2 50%), linear-gradient(90deg, #f4f5fb 50%, transparent 50%)"
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bordered {
  position: relative;
  height: 5rem;
  width: 5rem;
  font-size: 1.3rem;
  text-align: center;
  line-height: 65px;
  border-radius: 50%;
  background-color: #01c8b2;
  background-image: linear-gradient(90deg, transparent 50%, #f4f5fb 50%),
    linear-gradient(90deg, #f4f5fb 50%, transparent 50%);
  animation: border-fill 3s linear infinite;
}
.bordered:after {
  position: absolute;
  content: attr(data-percentage) "%";
  height: calc(100% - 14px);
  width: calc(100% - 14px);
  top: 7px;
  left: 7px;
  color: #808080;
  background-color: white;
  border-radius: 50%;
}
</style>
