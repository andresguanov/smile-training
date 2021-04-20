export default {
  props: {
    // Type:
    basic: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    ghost: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    typeClass() {
      if (this.primary) {
        return "is-primary"
      } else if (this.secondary) {
        return "is-secondary"
      } else if (this.outline) {
        return "is-outline"
      } else if (this.ghost) {
        return "is-ghost"
      }
      // Default:
      return "is-basic"
    }
  }
}
