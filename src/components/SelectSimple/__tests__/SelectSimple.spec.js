import { shallowMount } from "@vue/test-utils"
import smSelectSimple from "@components/SelectSimple/SelectSimple.vue"
import smIconHelp from "@components/Icon/IconHelp.vue"
let wrapper

describe("smSelectSimple", () => {
  //#region Basic render
  it("renders default select simple", () => {
    wrapper = shallowMount(smSelectSimple)
    const expectedSelect = wrapper.find("select")
    expect(expectedSelect.attributes("disabled")).toBeFalsy()
    expect(expectedSelect.classes("is-medium")).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("renders with full-width", () => {
    wrapper = shallowMount(smSelectSimple, {
      propsData: {
        block: true
      }
    })
    const expectedSelect = wrapper.find("select")
    expect(expectedSelect.classes("is-full-width")).toBe(true)
  })

  it("renders disabled state", () => {
    wrapper = shallowMount(smSelectSimple, {
      propsData: {
        disabled: true,
        hint: "hint",
        hintClass: "hint-class"
      }
    })
    const expectedSelect = wrapper.find("select")
    expect(expectedSelect.attributes("disabled")).toBeTruthy()
    expect(expectedSelect.classes("disabled")).toBe(true)
    expect(wrapper.find(".hint").classes("disabled")).toBe(true)
    expect(wrapper.find(".hint").classes("hint-class")).toBe(true)
  })

  it("renders error state", () => {
    wrapper = shallowMount(smSelectSimple, {
      propsData: {
        error: true,
        label: "label"
      }
    })
    expect(wrapper.find("select").classes("has-error")).toBe(true)
    expect(wrapper.find("label span").classes("has-error")).toBe(true)
  })

  it("shows a iconHelp", () => {
    const help = "help"
    wrapper = shallowMount(smSelectSimple, {
      propsData: {
        help
      }
    })
    const iconHelp = wrapper.findComponent(smIconHelp)
    expect(iconHelp.exists()).toBe(true)
  })

  it("renders label align to left and with labelClass", () => {
    const labelClass = "custom-class"
    wrapper = shallowMount(smSelectSimple, {
      propsData: {
        label: "label",
        labelClass
      }
    })
    const labelSpan = wrapper.find("label span.label")
    expect(labelSpan.exists()).toBe(true)
    expect(labelSpan.classes(labelClass)).toBe(true)
  })

  it("renders disabled state for loading", () => {
    wrapper = shallowMount(smSelectSimple, {
      propsData: {
        loading: true
      }
    })
    const expectedSelect = wrapper.find("select")
    expect(expectedSelect.classes("disabled")).toBe(true)
  })

  it("applies custom class and style to select element", () => {
    const selectClass = "custom-class"
    const selectStyle = "color: red;"
    wrapper = shallowMount(smSelectSimple, {
      propsData: {
        selectClass,
        selectStyle
      }
    })
    const expectedSelect = wrapper.find("select")
    expect(expectedSelect.classes(selectClass)).toBe(true)
    expect(expectedSelect.attributes("style")).toBe(selectStyle)
  })

  it("should be a small input", () => {
    wrapper = shallowMount(smSelectSimple, {
      propsData: { size: "small" }
    })
    expect(wrapper.find("select").classes()).toContain("is-small")
  })

  it("should be a large input", () => {
    wrapper = shallowMount(smSelectSimple, {
      propsData: { size: "large" }
    })
    expect(wrapper.find("select").classes()).toContain("is-large")
  })

  it("sets value", () => {
    const value = "select value"
    wrapper = shallowMount(smSelectSimple, {
      propsData: {
        value
      }
    })
    expect(wrapper.vm.$props.value).toBe(value)
  })
  //#endregion

  //#region Methods
  //#endregion

  //#region Events
  it("emit a input event", () => {
    const input = jest.fn()
    wrapper = shallowMount(smSelectSimple, {
      listeners: { input, change: input },
      slots: {
        default: "<option value='value'>option</option>"
      }
    })
    const expectedSelect = wrapper.find("select")
    const options = expectedSelect.findAll("option")
    options.at(0).setSelected()
    expectedSelect.trigger("input")
    expect(input).toHaveBeenCalledTimes(2)
  })
  //#endregion

  //#region Slots
  it("renders default slots", () => {
    // eslint-disable-next-line prettier/prettier
    const content = "<option value=\"value\">option</option>"
    wrapper = shallowMount(smSelectSimple, {
      slots: {
        default: content
      }
    })
    const expectedSelect = wrapper.find("select")
    expect(expectedSelect.find("option").html()).toBe(content)
  })

  it("renders help through slot", () => {
    wrapper = shallowMount(smSelectSimple, {
      slots: {
        help: "help content"
      }
    })
    expect(wrapper.findComponent(smIconHelp).exists()).toBe(true)
  })

  //#endregion
})
