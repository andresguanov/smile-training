<template>
  <div class="row middle-xs" :class="[showRequiredMsg ? 'between-xs' : 'end-xs']">
    <div v-if="showRequiredMsg" class="col-sm-6 req-text">Estos campos son obligatorios</div>
    <div class="col btn-cont">
      <sm-button @click="$emit('close')" :loading="loading">{{
        cancelButtonText || "Cancelar"
      }}</sm-button>
      <sm-button primary @click="okClicked" :loading="loading">{{
        buttonText || "Guardar"
      }}</sm-button>
    </div>
  </div>
</template>

<script>
import smButton from "./components/Button/Button"
export default {
  name: "footerModal",
  components: {
    smButton
  },
  props: {
    okFn: {
      type: Function,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: false
    },
    showRequiredMsg: {
      type: Boolean,
      default: true
    },
    buttonText: {
      type: String,
      default: ""
    },
    cancelButtonText: {
      type: String,
      default: ""
    }
  },
  inject: ["pluginModalProvide"],
  methods: {
    okClicked() {
      if (this.okFn && typeof this.okFn === "function") {
        this.okFn(this.pluginModalProvide.form, this.pluginModalProvide.$v)
      } else {
        this.$emit("ok")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.req-text {
  font-size: 12px;
}
.btn-cont > button {
  margin-left: 10px;
}
</style>
