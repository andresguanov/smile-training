<template>
  <div class="alert-stack">
    <sm-alert
      v-for="(alert, i) in alerts"
      :key="alert.id"
      v-bind="alert"
      stacked
      @close="remove(i)"
    />
  </div>
</template>

<script>
import smAlert from "./Alert.vue"
// import eventBus from "../../utils/eventBus"
export default {
  name: "sm-alert-stack",
  components: {
    smAlert
  },
  data() {
    return {
      alerts: []
    }
  },
  smEvents() {
    return {
      showAlert: this.alert
    }
  },
  created() {
    // this.$smEventBus.$on("showAlert", this.alert)
    // eventBus.$on("showAlert", this.alert)
  },
  methods: {
    alert({ title, message, type = "success", autoHideTimeout = 7500, hide = "auto" }) {
      if (title && message) {
        this.alerts.push({
          id: Math.floor(Math.random() * 4000),
          title,
          message,
          type,
          removed: false,
          autoHideTimeout,
          hide
        })
      }
    },
    remove(i) {
      setTimeout(() => {
        if (this.alerts[i]) {
          this.alerts[i].removed = true
        }
      }, 500)
      setTimeout(() => {
        if (this.alerts[i]) {
          this.alerts.splice(i, 1)
        }
      }, 700)
    }
  }
}
</script>

<style lang="scss" scoped>
.alert-stack {
  right: 0px;
  padding-right: 25px;
  top: 50px;
  position: absolute;
  overflow: hidden;
  z-index: 115;
}
</style>
