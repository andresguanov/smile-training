export default {
  props: {
    // Size
    size: {
      type: String,
      default: "medium",
      validator: value => {
        return ["small", "medium", "large", ""].includes(value)
      }
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sizeClass() {
      return this.size === "" ? "is-medium" : `is-${this.size}`
    }
  }
}
