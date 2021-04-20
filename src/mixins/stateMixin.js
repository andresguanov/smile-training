export default {
  props: {
    // State:
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: [Boolean, String, Array],
      default: false
    }
  },
  computed: {
    errorMessages() {
      if (typeof this.error === "string") return [this.error]
      else if (typeof this.error === "boolean") return []
      else return this.error
    }
  }
}
