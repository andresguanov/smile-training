<template>
  <sm-modal v-if="open" v-bind="options" @close="closeGlobalModal" />
</template>

<script>
import smModal from "./Modal.vue"
import eventBus from "../../utils/eventBus"
import { mergeKeepShape } from "../../utils/jsHelpers"

export default {
  name: "sm-plugin-modal",
  components: {
    smModal
  },
  provide() {
    return {
      pluginModalProvide: {
        form: {},
        $v: {}
      }
    }
  },
  data() {
    return {
      open: false,
      options: {},
      form: {}
    }
  },
  smEvents() {
    return {
      openModal: this.openGlobalModal,
      closeModal: this.closeGlobalModal,
      setOptionsModal: this.setGlobalOptions,
      setLoadingModal: this.setGlobalLoading
    }
  },
  created() {
    // eventBus.$on("openModal", this.openGlobalModal)
    // eventBus.$on("closeModal", this.closeGlobalModal)
  },
  methods: {
    openGlobalModal(options) {
      /**
       * options should be an object and may contain the following props
       *
       * modal: Object,
       * modalConfig: Object,
       * header: Object,
       * headerText: String,
       * headerConfig: Object,
       * headerActions: Object,
       * headerActionsConfig: Object,
       * headerEvents: Object,
       * body: Object,
       * bodyText: String,
       * bodyConfig: Object,
       * bodyEvents: Object,
       * footer: Object,
       * footerText: String,
       * footerConfig: Object,
       * footerEvents: Object,
       * noPaddingHeader: Boolean,
       * noPaddingBody: Boolean,
       * noPaddingFooter: Boolean,
       * paddingHeader: String,
       * paddingBody: String,
       * paddingFooter: String,
       * width: String,
       * loading: Boolean
       */
      // if (options.provide) {
      //   for (const key in options.provide) {
      //     this.$set(this.provide, key, options.provide[key])
      //   }
      //   // this.provide = options.provide
      //   delete options.provide
      // }
      this.options = options
      this.open = true
    },
    closeGlobalModal() {
      this.open = false
      this.options = {}
      this.form = {}
    },
    setGlobalOptions(newOptions) {
      this.options = mergeKeepShape(this.options, newOptions)
    },
    setGlobalLoading(newState) {
      // adds the loading if it's not present
      if (!this.options.loading) {
        this.$set(this.options, "loading", newState)
      }
      // sets the loading on footer (and the general one)
      this.options = mergeKeepShape(this.options, {
        footerConfig: {
          props: {
            loading: newState
          }
        },
        loading: newState
      })

      /* this.options = {
        ...this.options,
        footerConfig: {
          ...this.options.footerConfig,
          props: {
            ...this.options.footerConfig.props,
            loading: newState
          }
        },
        loading: newState
      } */
    }
  }
}
</script>
