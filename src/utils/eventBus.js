// import Vue from "vue"
import mitt from "mitt"

export const eventBus = {
  $on: (...args) => mitt.on(...args),
  $once: (...args) => mitt.once(...args),
  $off: (...args) => mitt.off(...args),
  $emit: (...args) => {
    // FIXME: esto no funca tampoco
    const ar = [...arguments]
    return mitt.emit(...ar)
  }
}
export const $smAlert = alert => eventBus.$emit("showAlert", alert)
export const $smOpenModal = options => eventBus.$emit("openModal", options)
export const $smCloseModal = () => eventBus.$emit("closeModal")
export const $smSetOptionsModal = options => eventBus.$emit("setOptionsModal", options)
export const $smSetLoadingModal = loadingState => eventBus.$emit("setLoadingModal", loadingState)

// export default eventBus

const install = app => {
  const readOnlyPrototypeProps = [
    {
      name: "$smAlert",
      value: $smAlert
    },
    {
      name: "$smOpenModal",
      value: $smOpenModal
    },
    {
      name: "$smCloseModal",
      value: $smCloseModal
    },
    {
      name: "$smSetOptionsModal",
      value: $smSetOptionsModal
    },
    {
      name: "$smSetLoadingModal",
      value: $smSetLoadingModal
    },
    {
      name: "$smEventBus",
      value: eventBus
    }
  ]
  for (const p of readOnlyPrototypeProps) {
    // eslint-disable-next-line no-prototype-builtins
    if (!app.config.globalProperties.hasOwnProperty(p.name))
      Object.defineProperty(app.config.globalProperties, p.name, {
        get() {
          return p.value
        }
      })
  }

  // const eventBus = new Vue()
  app.mixin({
    data() {
      return {
        // eslint-disable-next-line vue/no-reserved-keys
        __eventMap: {}
      }
    },
    beforeCreate() {
      let smEvents = this.$options.smEvents
      if (typeof smEvents !== "object" && typeof smEvents !== "function") return
      // console.log({...this.$vnode.componentOptions.Ctor.options}, "affsdfsd")
      // FIXME: esto no funciona.
      /* if (typeof this.$options.smEvents === "function") {
        let mergedMethods = {}
        debugger
        const mixins = this.$vnode.componentOptions.Ctor.options.mixins
        if (mixins)
          for (const mixin of mixins) {
            for (const key in mixin.methods) mergedMethods[key] = mixin.methods[key]
          }
        mergedMethods = { ...mergedMethods, ...this.$vnode.componentOptions.Ctor.options.methods }
        smEvents = smEvents.call(mergedMethods)
      } */
      // var eventMap = {}
      for (var key in smEvents) {
        this.__eventMap[key] = smEvents[key].bind(this)
      }
      // this.$once("hook:beforeMount", () => {
      //   for (var key in eventMap) {
      //     eventBus.$on(key, eventMap[key])
      //   }
      // })
      // this.$once("hook:beforeDestroy", () => {
      //   for (var key in eventMap) {
      //     eventBus.$off(key, eventMap[key])
      //   }
      //   eventMap = null
      // })
    },
    beforeMount() {
      for (const key in this.__eventMap) {
        eventBus.$on(key, this.__eventMap[key])
      }
    },
    beforeUnmount() {
      for (const key in this.__eventMap) {
        eventBus.$off(key, this.__eventMap[key])
      }
      this.__eventMap = null
    }
  })
}

export default install
