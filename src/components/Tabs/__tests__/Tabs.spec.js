import { shallowMount, mount } from "@vue/test-utils"
import smTabs from "@components/Tabs/Tabs"
import smTab from "@components/Tabs/Tab"
import smTabsBar from "@components/Tabs/TabsBar"
import smTabItem from "@components/Tabs/TabItem"
import smTabsItems from "@components/Tabs/TabsItems"

let wrapper

describe("smTabs", () => {
  beforeEach(() => {
    wrapper = mount(smTabs, {
      propsData: {
        value: ""
      },
      slots: {
        default: [
          "<sm-tab id='1' > 1 </sm-tab>",
          "<sm-tab id='2' > 2 </sm-tab>",
          "<sm-tab id='3' > 3 </sm-tab>",
          "<sm-tab-item value='1' > 1 </sm-tab-item>",
          "<sm-tab-item value='2' > 2 </sm-tab-item>",
          "<sm-tab-item value='3' > 3 </sm-tab-item>"
        ]
      },
      stubs: {
        "sm-tab": smTab,
        "sm-tab-item": smTabItem
      }
    })
  })
  //#region Basic render
  it("renders default smTabs", () => {
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findComponent(smTabsBar).exists()).toBe(true)
    expect(wrapper.findComponent(smTabsItems).exists()).toBe(true)
  })
  //#endregion

  //#region Props
  it("accepts only valid tabsPositions", async () => {
    const validator = wrapper.vm.$options.props.tabsPosition.validator

    expect(validator("left")).toBe(true)
    expect(validator("right")).toBe(true)
    expect(validator("center")).toBe(true)
    expect(validator("top")).toBe(false)
    expect(validator("bottom")).toBe(false)
    expect(validator("other")).toBe(false)

    await wrapper.setProps({ tabsPosition: "right" })

    expect(wrapper.find(".sm-tabs-bar.right").exists()).toBe(true)
  })
  it("grows", async () => {
    await wrapper.setProps({ grow: true })

    expect(wrapper.find(".sm-tabs-bar.grow").exists()).toBe(true)
  })
  //#endregion

  //#region Methods
  it("changes", () => {
    let value = ""
    const input = jest.fn(v => (value = v))
    wrapper = mount(smTabs, {
      propsData: {
        value
      },
      slots: {
        default: [
          "<sm-tab id='1' > 1 </sm-tab>",
          "<sm-tab id='2' > 2 </sm-tab>",
          "<sm-tab id='3' > 3 </sm-tab>",
          "<sm-tab-item value='1' > 1 </sm-tab-item>",
          "<sm-tab-item value='2' > 2 </sm-tab-item>",
          "<sm-tab-item value='3' > 3 </sm-tab-item>"
        ]
      },
      stubs: {
        "sm-tab": smTab,
        "sm-tab-item": smTabItem
      },
      listeners: {
        input
      }
    })
    wrapper.vm.change("tab")
    expect(input).toHaveBeenCalledTimes(1)
    expect(input).toHaveBeenCalledWith("tab")
  })

  it("parses nodes", () => {
    const { tabs, items } = wrapper.vm.parseNodes()
    expect(tabs.filter(tab => tab.componentOptions.tag === "sm-tab").length).toBe(3)
    expect(items.filter(item => item.componentOptions.tag === "sm-tab-item").length).toBe(3)
  })
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  //#endregion
})
