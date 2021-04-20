<template>
  <component :is="tag">
    <slot />
  </component>
</template>

<script>
// TODO: Color / State? (error, success, etc)
export default {
  name: "sm-heading",
  props: {
    size: {
      type: String,
      default: "1",
      validator: value => {
        return ["1", "2", "3", "4", "5", "6"].includes(value)
      }
    }
  },
  computed: {
    tag() {
      return `h${this.size}`
    }
  }
}
</script>
