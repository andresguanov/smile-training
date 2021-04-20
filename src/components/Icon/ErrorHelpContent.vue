<template>
  <div style="position: relative">
    <sm-icon icon="info" class="icon-error" />
    <ul>
      <li v-for="(error, i) in errorMessages" :key="i">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
import smIcon from "./Icon"
export default {
  components: {
    smIcon
  },
  props: {
    errorMessages: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-error {
  position: absolute;
  top: 1px;
  left: 0;
  color: #e85e42;
  &:hover {
    color: #e85e42;
  }
}
ul {
  font-size: 12px;
  list-style: none;
  display: inline-block;
  padding-left: 28px;
  padding-top: 6px;
  li {
    text-align: left;
    margin-bottom: 5px;
  }
}
</style>
