<script>
// Inpired on: https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/
export default {
  name: "sm-transition-width",
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
          element.style.width = "auto"
        },
        enter(element) {
          const height = getComputedStyle(element).height

          element.style.height = height
          element.style.position = "absolute"
          element.style.visibility = "hidden"
          element.style.width = "auto"

          const width = getComputedStyle(element).width

          element.style.height = null
          element.style.position = null
          element.style.visibility = null
          element.style.width = 0

          // Force repaint to make sure the
          // animation is triggered correctly.
          getComputedStyle(element).width

          setTimeout(() => {
            element.style.width = width
          })
        },
        leave(element) {
          const width = getComputedStyle(element).width

          element.style.width = width

          // Force repaint to make sure the
          // animation is triggered correctly.
          getComputedStyle(element).width

          setTimeout(() => {
            element.style.width = 0
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
