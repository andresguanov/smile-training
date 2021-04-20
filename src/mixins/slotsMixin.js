export default {
  methods: {
    hasDefaultSlot() {
      return !!this.$slots.default
    },
    hasSlot(slotName) {
      return !!this.$slots[slotName]
    },
    hasScopedSlot(slotName) {
      return !!this.$slots[slotName] // && !!this.$slots[slotName]()
      // const ss = this.$scopedSlots
      // return ss && ss[slotName] && typeof ss[slotName] === "function"
      // const slotNodes = ss && ss[slotName] && typeof ss[slotName] === "function" && ss[slotName]()
      // return slotNodes && slotNodes.length !== 0
    }
  }
}
