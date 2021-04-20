import { shallowMount, mount } from "@vue/test-utils"
import smButton from "@components/Button/Button"
let wrapper

describe("smButton", () => {
  beforeEach(() => {
    wrapper = shallowMount(smButton)
  })

  // it("is created correctly", () => {
  //   expect(wrapper.name()).toBe("smButton")
  //   expect(wrapper.isVueInstance()).toBeTruthy()
  // })

  //#region Basic Render
  it("render default button correctly", () => {
    expect(wrapper.element.tagName).toBe("BUTTON")
    expect(wrapper.classes()).toContain("button")
    expect(wrapper.classes()).toContain("is-basic")
    // Button is not rounded by default
    // expect(wrapper.classes()).toContain("is-rounded")
    expect(wrapper.classes()).toContain("is-medium")
    expect(wrapper.attributes("type")).toBe("button")
    expect(wrapper.attributes("disabled")).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("render anchor correctly", () => {
    wrapper = shallowMount(smButton, {
      propsData: { tag: "a" }
    })
    expect(wrapper.element.tagName).toBe("A")
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("render custom nativeType correctly", () => {
    const customType = "submit"
    wrapper = shallowMount(smButton, {
      propsData: { nativeType: customType }
    })
    expect(wrapper.attributes("type")).toBe(customType)
  })

  it("render primary button type correctly", () => {
    wrapper = shallowMount(smButton, {
      propsData: { primary: true }
    })
    expect(wrapper.classes()).toContain("is-primary")
  })

  it("render secondary button type correctly", () => {
    wrapper = shallowMount(smButton, {
      propsData: { secondary: true }
    })
    expect(wrapper.classes()).toContain("is-secondary")
  })

  it("render outline button type correctly", () => {
    wrapper = shallowMount(smButton, {
      propsData: { outline: true }
    })
    expect(wrapper.classes()).toContain("is-outline")
  })

  it("render ghost button type correctly", () => {
    wrapper = shallowMount(smButton, {
      propsData: { ghost: true }
    })
    expect(wrapper.classes()).toContain("is-ghost")
  })

  it("render disabled button correctly", () => {
    wrapper = shallowMount(smButton, {
      propsData: { disabled: true }
    })
    expect(wrapper.classes()).toContain("disabled")
    expect(wrapper.attributes("disabled")).toBeTruthy()
  })

  it("render loading button correctly", () => {
    wrapper = shallowMount(smButton, {
      propsData: { loading: true }
    })
    expect(wrapper.classes()).toContain("disabled")
    expect(wrapper.attributes("disabled")).toBeTruthy()
  })

  it("render pill button shape correctly", () => {
    wrapper = shallowMount(smButton, {
      propsData: { pill: true }
    })
    expect(wrapper.classes()).toContain("is-pill")
  })

  it("render square button shape correctly", () => {
    wrapper = shallowMount(smButton, {
      propsData: { square: true }
    })
    expect(wrapper.classes()).toContain("is-square")
  })

  it("render rounded button shape correctly", () => {
    wrapper = shallowMount(smButton, {
      propsData: { rounded: true }
    })
    expect(wrapper.classes()).toContain("is-rounded")
  })

  it("render rounded-left button shape correctly", () => {
    wrapper = shallowMount(smButton, {
      propsData: { roundedLeft: true }
    })
    expect(wrapper.classes()).toContain("is-rounded-left")
  })

  it("render rounded-right button shape correctly", () => {
    wrapper = shallowMount(smButton, {
      propsData: { roundedRight: true }
    })
    expect(wrapper.classes()).toContain("is-rounded-right")
  })

  it("should be a small button", () => {
    wrapper = shallowMount(smButton, {
      propsData: { size: "small" }
    })
    expect(wrapper.classes()).toContain("is-small")
  })

  it("should be a large button", () => {
    wrapper = shallowMount(smButton, {
      propsData: { size: "large" }
    })
    expect(wrapper.classes()).toContain("is-large")
  })

  it("should be a blocking button", () => {
    wrapper = shallowMount(smButton, {
      propsData: { block: true }
    })
    expect(wrapper.find(".is-full-width").exists()).toBe(true)
    // expect(wrapper.classes()).toContain("is-full-width")
  })

  it("should render content with label", () => {
    const content = "TestButton"
    wrapper = shallowMount(smButton, {
      propsData: { label: content }
    })
    expect(wrapper.text()).toBe(content)
  })

  it("should have a custom class", () => {
    const buttonClass = "custom-class"
    wrapper = shallowMount(smButton, {
      propsData: {
        buttonClass
      }
    })
    expect(wrapper.classes(buttonClass)).toBeTruthy()
  })

  it("should render only a icon", () => {
    const label = "button label"
    const icon = "plus"
    const iconClass = "custom-icon-class"

    wrapper = mount(smButton, {
      propsData: {
        label,
        iconButton: true,
        icon,
        iconClass
      }
    })
    expect(wrapper.classes("icon-only")).toBeTruthy()
    expect(wrapper.text()).not.toBe(label)
    expect(wrapper.get("svg").classes(iconClass)).toBeTruthy()
  })
  it("should render two icons", () => {
    wrapper = mount(smButton, {
      propsData: {
        iconLeft: "minus",
        iconRight: "plus"
      }
    })
    expect(wrapper.findAll("svg").length).toBe(2)
  })
  //#endregion

  //#region Methods
  //#endregion

  //#region Events
  it("emit a click event", () => {
    const click = jest.fn()
    wrapper = shallowMount(smButton, {
      listeners: { click }
    })
    wrapper.find(".button").trigger("click")
    expect(click).toHaveBeenCalledTimes(1)
  })
  //#endregion

  //#region Slots
  it("should render content with slot", () => {
    const content = "TestButton"
    wrapper = shallowMount(smButton, {
      slots: { default: content }
    })
    expect(wrapper.text()).toBe(content)
  })
  //#endregion

  /* it("should be large + icon", () => {
    wrapper = mount(smButton, {
      propsData: {
        size: "large",
        iconLeft: "plus"
      }
    })
    expect(wrapper.classes()).toContain("is-large")
    expect(wrapper.contains(".icon")).toBe(true)
  }) */
})
