<script>
// Insired on: https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/
export default {
  name: "sm-transition-height",
  functional: true,
  props: {
    transitionName: {
      type: String,
      default: "expand"
    },
    group: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: "span"
    }
  },
  render(createElement, context) {
    const data = {
      props: {
        name: context.props.transitionName,
        tag: context.props.tag
      },
      on: {
        afterEnter(element) {
          element.style.height = "auto"
        },
        enter(element) {
          const width = getComputedStyle(element).width

          element.style.width = width
          element.style.position = "absolute"
          element.style.visibility = "hidden"
          element.style.height = "auto"

          const height = getComputedStyle(element).height

          element.style.width = null
          element.style.position = null
          element.style.visibility = null
          element.style.height = 0

          // Force repaint to make sure the
          // animation is triggered correctly.
          getComputedStyle(element).height

          setTimeout(() => {
            element.style.height = height
          })
        },
        leave(element) {
          const height = getComputedStyle(element).height

          element.style.height = height

          // Force repaint to make sure the
          // animation is triggered correctly.
          getComputedStyle(element).height

          setTimeout(() => {
            element.style.height = 0
          })
        }
      }
    }
    const el = context.props.group ? "transition-group" : "transition"
    return createElement(el, data, context.children)
  }
}
</script>
<style scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
