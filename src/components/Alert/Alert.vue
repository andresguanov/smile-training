<template>
  <div
    :class="['alert', show ? 'bounceInRight' : 'bounceOutRight', type, { stacked }, { removed }]"
    ref="alert"
  >
    <div class="content">
      <div class="alert-icon">
        <icon :icon="type !== 'success' ? 'info' : type" size="large" />
      </div>
      <div class="text">
        <p class="is-small title" v-html="title"></p>
        <p class="is-small" v-html="message"></p>
      </div>
      <div class="close" @click="close">
        <icon icon="close" />
      </div>
    </div>
  </div>
</template>
<script>
import Icon from "../Icon/Icon"
export default {
  name: "sm-alert",
  components: {
    Icon
  },
  props: {
    autoHideTimeout: {
      type: [String, Number],
      default: 7500
    },
    hide: {
      type: String,
      default: "auto",
      validator: value => {
        return ["auto", "click", ""].includes(value)
      }
    },
    message: {
      type: String,
      default: ""
    },
    removed: {
      type: Boolean,
      default: false
    },
    stacked: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "success",
      validator: value => {
        return ["success", "warning", "error", "info", ""].includes(value)
      }
    }
  },
  data() {
    return {
      show: true,
      timeOutCallback: null
    }
  },
  mounted() {
    this.$refs.alert.style.height = this.$refs.alert.getBoundingClientRect().height + "px"
    if (this.hide === "auto") this.timeOutCallback = setTimeout(this.close, this.autoHideTimeout)
  },
  beforeUnmount() {
    if (this.timeOutCallback) {
      clearTimeout(this.timeOutCallback)
    }
  },
  methods: {
    close() {
      if (this.timeOutCallback) {
        clearTimeout(this.timeOutCallback)
        this.timeOutCallback = null
      }
      this.show = false
      this.$emit("close")
    }
  }
}
</script>
<style scoped lang="scss">
.alert {
  display: flex;
  flex-flow: column;
  padding: 10px 15px 10px 5px;
  width: 440px;
  background: #ffffff;
  align-content: flex-end;
  border-radius: 4px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-width: 6px 0px 0px 0px;
  border-color: #aad572;
  transition-duration: 300ms;
  z-index: 100;
  &:not(.stacked) {
    right: 25px;
    top: 50px;
    position: absolute;
  }
  &.removed {
    height: 0 !important;
    padding: 0;
    margin: 0;
    border-width: 0;
  }
  &.error {
    border-color: #ff8b73;
    background-color: #fff2f3;
    .content {
      .alert-icon .icon {
        fill: #ff8b73;
      }
    }
  }
  &.warning {
    border-color: #ffd772;
    background-color: #fefaea;
    .content {
      .alert-icon .icon {
        fill: #ffd772;
      }
    }
  }
  &.success {
    border-color: #aad572;
    background-color: #fafff5;
    .content {
      .alert-icon .icon {
        fill: #aad572;
      }
    }
  }
  &.info {
    border-color: #4a90e2;
    background-color: #eefcff;
    .content {
      .alert-icon .icon {
        fill: #4a90e2;
      }
    }
  }
  .content {
    display: flex;
    // margin-top: 10px;
    .title {
      font-weight: 500;
    }
  }
  .content .alert-icon {
    flex: 0 0 10%;
    text-align: center;
    margin-top: -5px;
  }
  .content .close {
    flex: 0 0 10%;
    text-align: center;
    cursor: pointer;
    .icon {
      color: #dadada !important;
    }
  }
}
.content .info .success {
  fill: #aad572;
}
.error {
  fill: #e85e42;
}
.warning {
  fill: #f99d36;
}
.content .text {
  flex: 0 0 80%;
}
.content .text p {
  margin-bottom: 5px;
}
/* Animation */
@keyframes bounceInRight {
  from {
    -webkit-transform: translate3d(3000px, 0, 0);
    transform: translate3d(3000px, 0, 0);
  }
  to {
    -webkit-transform: translate3d(0px, 0px, 0px);
    transform: translate3d(0px, 0px, 0px);
  }
}
@keyframes bounceOutRight {
  from {
    -webkit-transform: translate3d(0px, 0px, 0px);
    transform: translate3d(0px, 0px, 0px);
  }
  to {
    -webkit-transform: translate3d(3000px, 0, 0);
    transform: translate3d(3000px, 0, 0);
  }
}
.bounceInRight {
  animation-name: bounceInRight;
  animation-duration: 1000ms;
}
.bounceOutRight {
  animation-name: bounceOutRight;
  animation-duration: 1500ms;
  animation-fill-mode: forwards;
}
@media screen and (max-width: 1400px) {
  .alert {
    // right: 20px;
    width: 440px;
  }
}
@media screen and (max-width: 1024px) {
  .alert {
    // right: 10px;
    width: 400px;
  }
  .content .text .title {
    font-size: 1.05rem;
    margin-bottom: 5px;
  }
  .content .text p {
    font-size: 0.85rem;
  }
}
@media screen and (max-width: 625px) {
  .alert {
    // right: 10px;
    width: 350px;
  }
  .content .text .title {
    font-size: 0.95rem;
    margin-bottom: 2px;
  }
  .content .text p {
    font-size: 0.8rem;
  }
}
</style>
