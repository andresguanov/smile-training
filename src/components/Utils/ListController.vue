<script>
export default {
  name: "sm-list-controller",
  props: {
    listLength: Number
  },
  data() {
    return {
      selectedIndex: -1
    }
  },
  render(h) {
    return h("div", this.$slots.default({ selectedIndex: this.selectedIndex }))
  },
  methods: {
    setSelectedIndex(index) {
      this.selectedIndex = index
    },
    clearSelectedIndex() {
      this.selectedIndex = -1
    },
    keyHandler(e) {
      /**
        38 - up
        40 - down
        9 - tab
        13 - enter
       */
      const key = e.which || e.keyCode
      if (key === 38 /* || (e.shiftKey && key === 9) */) {
        this.handleKeyUp(e)
      } else if (key === 40 /* || key === 9 */) {
        this.handleKeyDown(e)
      } else if (key === 13 || key === 9) {
        this.handleEnter(e)
      }
    },
    handleEnter(e) {
      e.preventDefault()
      this.$emit("selected", this.selectedIndex)
    },
    handleKeyUp(e) {
      e.preventDefault()
      if (this.selectedIndex <= 0) {
        // If index is less than or equal to zero then set it to the last item index
        this.selectedIndex = this.listLength - 1
      } else if (this.selectedIndex > 0 && this.selectedIndex <= this.listLength - 1) {
        // If index is larger than zero and smaller or equal to last index then decrement
        this.selectedIndex--
      }
      this.$emit("key-up", this.selectedIndex)
    },
    handleKeyDown(e) {
      e.preventDefault()
      // Check if index is below 0
      // This means that we did not start yet
      if (this.selectedIndex < 0 || this.selectedIndex === this.listLength - 1) {
        // Set the index to the first item
        this.selectedIndex = 0
      } else if (this.selectedIndex >= 0 && this.selectedIndex < this.listLength - 1) {
        this.selectedIndex++
      }
      this.$emit("key-down", this.selectedIndex)
    },
    addKeyHandler() {
      window.addEventListener("keydown", this.keyHandler)
    },
    removeKeyHandler() {
      window.removeEventListener("keydown", this.keyHandler)
    }
  },
  created() {
    this.addKeyHandler()
  },
  unmounted() {
    this.removeKeyHandler()
  }
}
</script>
