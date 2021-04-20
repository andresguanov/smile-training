import { createApp } from "vue"
import App from "./App.vue"

import * as components from "./components"

import "@alegradev/smile-ui-css/dist/smile.min.css"
// Para uso local del CSS descomentar la siguiente linea y comentar la anterior (ver README.md)
//import "@alegradev/smile-ui-css/src/alegra.scss"

// CSS para los iconos:
import "@alegradev/smile-icons/dist/smile-icons.css"

// CSS general:
import "./assets/general.scss"

// Tooltip plugin
// import "tippy.js/themes/light.css"
import "tippy.js/themes/light-border.css"
// import "tippy.js/themes/google.css"
// import "tippy.js/themes/translucent.css"

const app = createApp(App)

// Utilidad / Pluugin para generar los ids unicos a los componentes.
import uuid from "./utils/uuid"
app.use(uuid)

import VueTippy from "vue-tippy"
app.use(VueTippy, {
  theme: "light-border",
  directive: "tooltip",
  component: "sm-tooltip",
  arrow: true
})

import eventBusPlugin, {
  eventBus,
  $smAlert,
  $smCloseModal,
  $smOpenModal,
  $smSetLoadingModal,
  $smSetOptionsModal
} from "./utils/eventBus"

import vClickOutside from "v-click-outside"
app.directive("click-outside", vClickOutside.directive)

import { createMetaManager } from "vue-meta"
app.use(createMetaManager())

import VueVisible from "./directives/visible"
import VueFocus from "./directives/focus"

if (process.env.NODE_ENV === "development") {
  app.config.globalProperties.$smAlert = (alert: any) => eventBus.$emit("showAlert", alert)
  app.config.globalProperties.$smOpenModal = (options: any) => eventBus.$emit("openModal", options)
  app.config.globalProperties.$smCloseModal = $smCloseModal
  app.config.globalProperties.$smSetOptionsModal = $smSetOptionsModal
  app.config.globalProperties.$smSetLoadingModal = $smSetLoadingModal
  app.use(VueVisible)
  app.use(eventBusPlugin)
  app.use(VueFocus)
}

app.mount("#app")

// const $smAlert = alert => eventBus.$emit("showAlert", alert)
// const $smOpenModal = options => eventBus.$emit("openModal", options)
// const $smCloseModal = () => eventBus.$emit("closeModal")

// Método install del plugin: https://es.vuejs.org/v2/guide/plugins.html#Escribiendo-un-Plugin
const install = (app: any, options = { prefix: String }) => {
  // for (const key in components) {
  //   const _key = options.prefix ? options.prefix + key : key
  //   // Registra de manera global los componentes
  //   const component = components[key]
  //   app.component(_key, component)
  // }

  app.component("smButton", smButton)
  app.component("smInput", smInput)
  app.component("smNumberInput", smNumberInput)
  app.component("smSelectSimple", smSelectSimple)
  app.component("smIcon", smIcon)
  app.component("smIconHelp", smIconHelp)
  app.component("smCheckbox", smCheckbox)
  app.component("smRadio", smRadio)
  app.component("smHeading", smHeading)
  app.component("smParagraph", smParagraph)
  app.component("smInnerLoading", smInnerLoading)
  app.component("smListController", smListController)
  app.component("smTransitionWidth", smTransitionWidth)
  app.component("smTransitionHeight", smTransitionHeight)
  app.component("smCard", smCard)
  app.component("smAlert", smAlert)
  app.component("smAlertStack", smAlertStack)
  app.component("smContextMenu", smContextMenu)
  app.component("smModal", smModal)
  app.component("smPluginModal", smPluginModal)
  app.component("smSelect", smSelect)
  app.component("smAccordion", smAccordion)
  app.component("smAccordionItem", smAccordionItem)
  app.component("smAccordionWithLinks", smAccordionWithLinks)
  app.component("smTabs", smTabs)
  app.component("smTab", smTab)
  app.component("smTabItem", smTabItem)
  app.component("smDatepicker", smDatepicker)
  app.component("smPagination", smPagination)
  app.component("smMarkupTable", smMarkupTable)
  app.component("smTable", smTable)
  app.component("smTextarea", smTextarea)
  app.component("smProgressBar", smProgressBar)
  app.component("smProgressCircle", smProgressCircle)
  app.component("smButtonGroup", smButtonGroup)
  app.component("smToggle", smToggle)

  app.use(VueTippy, {
    theme: "light-border",
    directive: "tooltip",
    component: "sm-tooltip",
    arrow: true
  })
  app.directive("click-outside", vClickOutside.directive)

  app.use(createMetaManager())

  // Para poder enviar alertas desde cualquier parte de la aplicación y debido al
  //problema del provide cuando se carga localmente
  //FIXME: Recordar que al usarlo de esta manera solo se puede usar un AlertStack, de lo
  //contrario todos responderían al evento definido
  app.use(eventBusPlugin)
  // Vue.prototype.$smAlert = $smAlert
  // Vue.prototype.$smOpenModal = $smOpenModal
  // Vue.prototype.$smCloseModal = $smCloseModal

  app.use(VueVisible)
  app.use(VueFocus)
}
// Auto-install (https://alligator.io/vuejs/creating-custom-plugins/#automatic-installation)
// if (typeof window !== "undefined" && window.Vue) {
//   install(window.Vue)
// }

// Export de la funcion install
export default install
// Export por separado de cada uno de los componentes, para su uso individual (se extraen esas keys de la var components):
export const {
  smButton,
  smInput,
  smNumberInput,
  smSelectSimple,
  smIcon,
  smIconHelp,
  smCheckbox,
  smRadio,
  smHeading,
  smParagraph,
  smInnerLoading,
  smListController,
  smTransitionWidth,
  smTransitionHeight,
  smCard,
  smAlert,
  smAlertStack,
  smContextMenu,
  smModal,
  smPluginModal,
  smSelect,
  smAccordion,
  smAccordionItem,
  smAccordionWithLinks,
  smTabs,
  smTab,
  smTabItem,
  smDatepicker,
  smPagination,
  smMarkupTable,
  smTable,
  smTextarea,
  smProgressBar,
  smProgressCircle,
  smButtonGroup,
  smToggle
} = components

export {
  uuid,
  eventBus,
  $smAlert,
  $smOpenModal,
  $smCloseModal,
  $smSetLoadingModal,
  $smSetOptionsModal
}
