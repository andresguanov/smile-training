<template>
  <component :is="tag" :style="skelStyle" class="skeleton"></component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    width: {
      type: String,
      default: "50%"
    },
    height: {
      type: String,
      default: "40px"
    }
  },
  computed: {
    skelStyle() {
      return {
        "--skel-width": this.width,
        "--skel-height": this.height
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$color-base: #e0e0e0;
$color-highlight: lighten($color-base, 7%);

.skeleton {
  position: relative;
  overflow: hidden;
  width: var(--skel-width);
  height: var(--skel-height);
  background: $color-base;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, $color-base, $color-highlight, $color-base);
    animation: progress 1s ease-in-out infinite;
  }
}

@keyframes progress {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
