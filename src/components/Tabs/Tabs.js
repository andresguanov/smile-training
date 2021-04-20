import smTabsBar from "./TabsBar"
import smTabsItems from "./TabsItems"
import { h } from "vue"

export default {
  name: "sm-tabs",
  props: {
    value: {
      type: String,
      required: true
    },
    tabsPosition: {
      type: String,
      default: "left",
      validator: value => {
        return ["left", "right", "center", ""].includes(value)
      }
    },
    grow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultSelectTab: ""
    }
  },
  methods: {
    change(tab) {
      this.$emit("input", tab)
    },
    genBar(tabs) {
      return this.$createElement(
        smTabsBar,
        {
          props: {
            activeTab: this.value !== "" ? this.value : tabs[0].componentOptions.propsData.id,
            tabsPosition: this.tabsPosition,
            grow: this.grow
          },
          on: { change: this.change }
        },
        tabs
      )
    },
    genItems(items) {
      return this.$createElement(
        smTabsItems,
        { props: { activeTab: this.value !== "" ? this.value : this.defaultSelectTab } },
        items
      )
    },
    parseNodes() {
      const tabs = []
      const items = []
      const slot = (this.$slots.default && this.$slots.default()) || []

      for (let i = 0; i < slot.length; i++) {
        const vnode = slot[i]
        if (vnode.componentOptions) {
          switch (vnode.componentOptions.tag) {
            case "sm-tab-item":
              items.push(vnode)
              break
            case "sm-tab":
              tabs.push(vnode)
              break
            default:
              break
          }
        } else {
          tabs.push(vnode)
        }
      }
      return { tabs, items }
    }
  },
  render() {
    const { tabs, items } = this.parseNodes()
    // this.defaultSelectTab = tabs[0].componentOptions.propsData.id
    // FIXME: revisar esto si funciona
    this.defaultSelectTab = tabs?.[0]?.dynamicChildren?.[0]?.props?.id

    if (!tabs.length) {
      console.error("Tabs are required inside Tabs component. Need to use smTab component")
      return h("h1", "Tabs are required inside Tabs component. Need to use smTab component")
    }
    if (!items.length) {
      console.error("Items are required inside Tabs component. Need to use smTabItem component")
      return h("h1", "Items are required inside Tabs component. Need to use smTabItem component")
    }
    return h("div", { class: "sm-tabs" }, [this.genBar(tabs), this.genItems(items)])
  }
}
