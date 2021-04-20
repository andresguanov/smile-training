<template>
  <p :class="[$props.size ? `is-${$props.size}` : 'is-medium']" v-bind="$attrs">
    <slot />
  </p>
</template>

<script>
// TODO: Color / State? (error, success, etc)
export default {
  name: "sm-paragraph",
  props: {
    size: String
  }
}
</script>
