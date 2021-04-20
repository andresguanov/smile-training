export default {
  props: {
    // Shape:
    pill: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    roundedRight: {
      type: Boolean,
      default: false
    },
    roundedLeft: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    shapeClass() {
      if (this.pill) {
        return "is-pill"
      } else if (this.square) {
        return "is-square"
      } else if (this.roundedRight) {
        return "is-rounded-right"
      } else if (this.roundedLeft) {
        return "is-rounded-left"
      } else if (this.rounded) {
        return "is-rounded"
      }
    }
  }
}
