<template>
  <div class="modal">
    <slot name="modal">
      <!-- <component v-if="modal" :is="modal" v-bind="modalConfig" /> -->
      <sm-component-extended v-if="modal" :component="modal" v-bind="modalConfig" />
      <sm-card-proposal
        v-else
        :no-padding-header="noPaddingHeaderComputed"
        :no-padding-body="noPaddingBodyComputed"
        :no-padding-footer="noPaddingFooterComputed"
        :padding-header="paddingHeaderComputed"
        :padding-body="paddingBodyComputed"
        :padding-footer="paddingFooterComputed"
        :width="width"
      >
        <template v-slot:header>
          <template v-if="headerText"><div v-html="headerText"></div></template>
          <template v-else-if="$slots.header || header">
            <slot name="header">
              <!-- <component v-if="header" :is="header" v-bind="headerConfig" /> -->
              <sm-component-extended v-if="header" :component="header" v-bind="headerConfig" />
            </slot>
          </template>
        </template>
        <template v-slot:[`header.actions`]>
          <slot name="header.actions">
            <!-- <component v-if="headerActions" :is="headerActions" v-bind="headerActionsConfig" /> -->
            <sm-component-extended
              v-if="headerActions"
              :component="headerActions"
              v-bind="headerActionsConfig"
              v-on="headerEvents"
            />
            <span v-else @click="emitClose">
              <sm-icon icon="close" :style="closeButtonStyle" :disabled="loading" />
            </span>
          </slot>
        </template>
        <template v-slot:body>
          <template v-if="bodyText"><div v-html="bodyText"></div></template>
          <template v-else-if="$slots.default || body">
            <slot>
              <!-- <component v-if="body" :is="body" v-bind="bodyConfig" /> -->
              <sm-component-extended
                v-if="body"
                :component="body"
                v-bind="bodyConfig"
                v-on="bodyEvents"
              />
            </slot>
          </template>
        </template>
        <template v-slot:footer>
          <template v-if="footerText"><div v-html="footerText"></div></template>
          <template v-else-if="$slots.footer || footer">
            <slot name="footer">
              <!-- <component v-if="footer" :is="footer" v-bind="footerConfig" @close="emitClose" /> -->
              <sm-component-extended
                v-if="footer"
                :component="footer"
                v-bind="footerConfig"
                v-on="footerEvents"
                @close="emitClose"
              />
            </slot>
          </template>
        </template>
      </sm-card-proposal>
    </slot>
  </div>
</template>

<script>
import smCardProposal from "../Card/CardProposal/Card.vue"
import smComponentExtended from "../ComponentExtended/ComponentExtended"
import smIcon from "../Icon/Icon"
export default {
  name: "sm-modal",
  components: {
    smCardProposal,
    smComponentExtended,
    smIcon
  },
  props: {
    modal: {
      type: Object,
      default: () => null
    },
    modalConfig: {
      type: Object,
      default: () => null
    },
    header: {
      type: Object,
      default: () => null
    },
    headerText: {
      type: String,
      default: ""
    },
    headerConfig: {
      type: Object,
      default: () => null
    },
    headerActions: {
      type: Object,
      default: () => null
    },
    headerActionsConfig: {
      type: Object,
      default: () => null
    },
    body: {
      type: Object,
      default: () => null
    },
    bodyText: {
      type: String,
      default: ""
    },
    bodyConfig: {
      type: Object,
      default: () => null
    },
    footer: {
      type: Object,
      default: () => null
    },
    footerText: {
      type: String,
      default: ""
    },
    footerConfig: {
      type: Object,
      default: () => null
    },
    noPaddingHeader: {
      type: Boolean,
      default: false
    },
    noPaddingBody: {
      type: Boolean,
      default: false
    },
    noPaddingFooter: {
      type: Boolean,
      default: false
    },
    paddingHeader: {
      type: String,
      default: ""
    },
    paddingBody: {
      type: String,
      default: ""
    },
    paddingFooter: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    headerEvents: {
      type: Object,
      default: undefined
    },
    bodyEvents: {
      type: Object,
      default: undefined
    },
    footerEvents: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    closeButtonStyle() {
      return this.loading ? { cursor: "normal" } : { cursor: "pointer" }
    },
    noPaddingHeaderComputed() {
      const aux =
        (this.headerConfig && this.headerConfig.props && this.headerConfig.props.noPadding) || false
      return this.noPaddingHeader || aux
    },
    noPaddingBodyComputed() {
      const aux =
        (this.bodyConfig && this.bodyConfig.props && this.bodyConfig.props.noPadding) || false
      return this.noPaddingBody || aux
    },
    noPaddingFooterComputed() {
      const aux =
        (this.footerConfig && this.footerConfig.props && this.footerConfig.props.noPadding) || false
      return this.noPaddingFooter || aux
    },
    paddingHeaderComputed() {
      const aux =
        (this.headerConfig && this.headerConfig.props && this.headerConfig.props.padding) ||
        undefined
      return this.paddingHeader || aux
    },
    paddingBodyComputed() {
      const aux =
        (this.bodyConfig && this.bodyConfig.props && this.bodyConfig.props.padding) || undefined
      return this.paddingBody || aux
    },
    paddingFooterComputed() {
      const aux =
        (this.footerConfig && this.footerConfig.props && this.footerConfig.props.padding) ||
        undefined
      return this.paddingFooter || aux
    }
  },
  methods: {
    emitClose() {
      if (!this.loading) this.$emit("close")
    }
  },
  beforeMount() {
    document.body.style.height = "100vh"
    document.body.style.overflowY = "hidden"
  },
  beforeUnmount() {
    const modals = document.querySelectorAll(".modal")
    if (!modals.length) {
      document.body.style.height = ""
      document.body.style.overflowY = ""
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.4);
  z-index: 110;
  justify-content: center;
  align-items: center;
  display: flex;
  :deep(.card > .body) {
    max-height: calc(100vh - 240px);
    overflow-y: auto;

    // Didn't work, test it better
    /* ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.5);
    }*/
  }
}
</style>
