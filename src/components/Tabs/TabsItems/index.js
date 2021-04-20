import smTabItem from "../TabItem"
import "./styles.scss"
export default {
  name: "sm-tabs-items",
  props: {
    activeTab: {
      type: String,
      default: ""
    }
  },
  render(h) {
    return h(
      "div",
      { class: "sm-tabs-items" },
      this.$slots.default.map(item => {
        if (item.componentOptions && item.componentOptions.tag === "sm-tab-item") {
          item.componentOptions.propsData["activeTab"] = this.activeTab
          return item
        } else {
          return h(smTabItem, [item])
        }
      })
    )
  }
}
