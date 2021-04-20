<template>
  <div v-if="value" :class="['loading', { absolute }]">
    <div class="msg-inner">
      <sm-progress-circle size="small" style="" />
      <div class="msg">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
import smProgressCircle from "../Progress/ProgressCircle"
export default {
  name: "sm-inner-loading",
  components: {
    smProgressCircle
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: "Buscando..."
    },
    absolute: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  padding: 2px;
  border: 1px solid;
  border-color: #fff;
  background-color: rgba($color: #ffffff, $alpha: 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
}
.loading.absolute {
  position: absolute;
  top: 0;
  left: 0;
}
.loading .msg-inner {
  width: auto;
  border-radius: 5px;
  padding: 0 5px;
  border-style: solid;
  border-width: 1px;
  border-color: #b3b3b3;
  background-color: #fff;
  display: inline-block;
  position: relative;
}
.loading .msg-inner .msg {
  display: inline-block;
  // background-repeat: no-repeat;
  // background-position: 5px center;
  // background-image: url(https://cdn1.alegra.com/images/smile-loading.gif);
  padding: 10px 10px 10px 35px;
  cursor: wait;
  background-color: #fff;
  color: #777;
  font-family: "Roboto", sans-serif;
  border-radius: 5px;
}
.loading .progress-circle {
  position: absolute;
  left: 20px;
  top: -7px;
  cursor: wait;
}
</style>
