export default {
  props: {
    value: [String, Number, Boolean, Object, Array], //Function,
    nativeValue: [String, Number, Boolean, Object, Array], //Function,
    type: String,
    disabled: Boolean,
    required: Boolean,
    name: String,
    hint: {
      type: String,
      default: ""
    },
    hintClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      newValue: this.value
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue
      },
      set(value) {
        this.newValue = value
        this.$emit("input", value)
      }
    }
  },
  watch: {
    /**
     * When v-model change, set internal value.
     */
    value(value) {
      this.newValue = value
    }
  },
  methods: {
    focus() {
      // MacOS FireFox and Safari do not focus when clicked
      this.$refs.input.focus()
    }
  }
}
