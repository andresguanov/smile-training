import { shallowMount, mount } from "@vue/test-utils"
import smButtonGroup from "@components/ButtonGroup/ButtonGroup"
import smIconHelp from "@components/Icon/IconHelp.vue"
let wrapper
let setValue
const $id = id => id

describe("smButtonGroup", () => {
  beforeEach(() => {
    setValue = jest.fn()
    wrapper = shallowMount(smButtonGroup, {
      propsData: {
        options: [
          { text: "Opt 1", value: "1" },
          { text: "Opt 2", value: "2" },
          { text: "Opt 3", value: "3" }
        ]
      },
      mocks: {
        $id
        // setValue
      }
    })
  })

  //#region Basic Render
  it("render default button correctly", () => {
    const buttons = wrapper.findAll("button")
    expect(buttons.length).toBe(3)
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons.at(i)
      expect(button.classes("is-primary")).toBe(false)
      expect(button.classes("is-medium")).toBe(true)
      expect(button.classes("side-border")).toBe(i !== wrapper.vm.options.length - 1 ? true : false)
    }
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("render primary button type correctly", async () => {
    await wrapper.setProps({
      value: "1"
    })
    expect(wrapper.find(".is-primary").exists()).toBe(true)
  })

  it("should be a small button", async () => {
    await wrapper.setProps({
      size: "small"
    })
    const buttons = wrapper.findAll("button")
    expect(buttons.length).toBe(3)
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons.at(i)
      expect(button.classes("is-small")).toBe(true)
    }
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should be a large button", async () => {
    await wrapper.setProps({
      size: "large"
    })
    const buttons = wrapper.findAll("button")
    expect(buttons.length).toBe(3)
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons.at(i)
      expect(button.classes("is-large")).toBe(true)
    }
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should have a grow class", async () => {
    await wrapper.setProps({
      grow: true
    })
    expect(wrapper.find(".grow").exists()).toBe(true)
  })

  it("should render content with label", async () => {
    const label = "<b>group button label</b>"
    const labelClass = "group-button-class"
    await wrapper.setProps({
      label,
      labelClass
    })
    const expectedLabel = wrapper.find(`.${labelClass}`)
    expect(expectedLabel.html()).toBe(
      '<span class="label is- group-button-class"><b>group button label</b></span>'
    )
  })

  it("shows a iconHelp", async () => {
    const help = "help"
    await wrapper.setProps({
      help
    })
    const iconHelp = wrapper.findComponent(smIconHelp)
    expect(iconHelp.exists()).toBe(true)
  })

  // it("should render only a icon", () => {
  //   const label = "button label"
  //   const icon = "plus"
  //   const iconClass = "custom-icon-class"

  //   wrapper = mount(smButtonGroup, {
  //     propsData: {
  //       label,
  //       iconButton: true,
  //       icon,
  //       iconClass
  //     }
  //   })
  //   expect(wrapper.classes("icon-only")).toBeTruthy()
  //   expect(wrapper.text()).not.toBe(label)
  //   expect(wrapper.get("svg").classes(iconClass)).toBeTruthy()
  // })
  // it("should render two icons", () => {
  //   wrapper = mount(smButtonGroup, {
  //     propsData: {
  //       iconLeft: "minus",
  //       iconRight: "plus"
  //     }
  //   })
  //   expect(wrapper.findAll("svg").length).toBe(2)
  // })
  //#endregion

  //#region Methods
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  it("renders help through slot", () => {
    wrapper = shallowMount(smButtonGroup, {
      slots: {
        help: "help content"
      }
    })
    expect(wrapper.findComponent(smIconHelp).exists()).toBe(true)
  })
  //#endregion
})
