import smTab from "../Tab"
import smIcon from "../../Icon/Icon"
import { debounce } from "lodash-es"
import "./styles.scss"
export default {
  name: "sm-tabs-bar",
  props: {
    activeTab: {
      type: String,
      default: ""
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
      overflowDifference: 0,
      overflowed: false,
      scrollFactor: 100,
      scrolled: { value: 0 },
      prevLength: 0
    }
  },
  methods: {
    /**
     * Send the selected tab upwards to Tabs component
     * @param {string} id Tab's identifier
     */
    handleClick(id) {
      this.$emit("change", id)
    },
    handleOverflow() {
      const el = this.$refs.tabsBar
      if (el && el.scrollWidth > el.clientWidth) {
        this.overflowed = true
        this.overflowDifference = el.scrollWidth - el.clientWidth + 50
      } else {
        this.overflowed = false
      }
      this.$set(this.scrolled, "value", 0)
    },
    scrollToLeft() {
      const dif = this.scrolled.value - this.scrollFactor
      this.scrolled.value = dif > 0 ? dif : 0
      this.$set(this.scrolled, "value", dif > 0 ? dif : 0)
    },
    scrollToRight() {
      const sum = this.scrolled.value + this.scrollFactor
      this.$set(
        this.scrolled,
        "value",
        sum < this.overflowDifference ? sum : this.overflowDifference
      )
    }
  },
  mounted() {
    this.prevLength = this.$children.length
    // for (const child of this.$children) {
    //   child.$on("click", this.handleClick)
    // }
    this.handleOverflow()
    window.addEventListener("resize", debounce(this.handleOverflow, 300))
  },
  updated() {
    if (this.prevLength !== this.$children.length) {
      this.prevLength = this.$children.length
      for (const child of this.$children) {
        child.$off("click")
        child.$on("click", this.handleClick)
      }
      this.handleOverflow()
    }
  },
  render(h) {
    /**@type {Array} */
    const tabs = this.$slots.default.map(tab => {
      if (tab.componentOptions && tab.componentOptions.tag === "sm-tab") {
        tab.componentOptions.propsData["activeTab"] = this.activeTab
        tab.componentOptions.propsData["scrolled"] = this.scrolled
        tab.componentOptions.listeners = {
          click: this.handleClick
        }
        return tab
      } else {
        return h(smTab, [tab])
      }
    })
    if (this.overflowed) {
      tabs.unshift(
        h(smIcon, {
          class: "tab-nav prev",
          props: { icon: "arrow-left" },
          nativeOn: { click: this.scrollToLeft }
        })
      )
      tabs.push(
        h(smIcon, {
          class: "tab-nav next",
          props: { icon: "arrow-right" },
          nativeOn: { click: this.scrollToRight }
        })
      )
    }

    return h(
      "div",
      {
        class: ["sm-tabs-bar", this.tabsPosition, { grow: this.grow, overflowed: this.overflowed }],
        ref: "tabsBar"
      },
      tabs
    )
  }
}
