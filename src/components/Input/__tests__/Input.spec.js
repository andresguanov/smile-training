import { shallowMount } from "@vue/test-utils"
import smInput from "@components/Input/Input.vue"
import smIcon from "@components/Icon/Icon.vue"
import smIconHelp from "@components/Icon/IconHelp.vue"
let wrapper

describe("smInput", () => {
  //#region Basic render
  it("renders default smInput", () => {
    wrapper = shallowMount(smInput)
    const expectedInput = wrapper.findComponent({ ref: "input" })
    expect(expectedInput.attributes("type")).toBe("text")
    expect(expectedInput.attributes("disabled")).toBeFalsy()
    expect(expectedInput.classes("is-medium")).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("renders with full-width", () => {
    wrapper = shallowMount(smInput, {
      propsData: {
        block: true
      }
    })
    const expectedInput = wrapper.findComponent({ ref: "input" })
    expect(expectedInput.classes("is-full-width")).toBe(true)
  })

  it("renders disabled state", () => {
    wrapper = shallowMount(smInput, {
      propsData: {
        disabled: true,
        hint: "hint",
        hintClass: "hint-class"
      }
    })
    const expectedInput = wrapper.findComponent({ ref: "input" })
    expect(expectedInput.attributes("disabled")).toBeTruthy()
    expect(expectedInput.classes("disabled")).toBe(true)
    expect(wrapper.find(".hint").classes("disabled")).toBe(true)
    expect(wrapper.find(".hint").classes("hint-class")).toBe(true)
  })

  it("renders error state", () => {
    wrapper = shallowMount(smInput, {
      propsData: {
        error: true,
        label: "label"
      }
    })
    expect(wrapper.findComponent({ ref: "input" }).classes("has-error")).toBe(true)
    expect(wrapper.find("label span").classes("has-error")).toBe(true)
    expect(wrapper.findComponent(smIcon).exists()).toBe(true)
    expect(wrapper.findComponent(smIcon).classes("icon-error")).toBe(true)
  })

  // there is NO WAY to MOCK OR STUB a ref to an html element
  // THROUGH MOUNTING OPTIONS
  it("focus input when mounted", () => {
    const focus = jest.fn()
    const mock = {
      focus: true,
      $refs: {
        input: {
          focus
        }
      }
    }
    // took me a very very very long time get to this
    // https://github.com/vuejs/vue-test-utils/issues/271#issuecomment-436420971
    // TODO: do this check with end-to-end test. At the moment of writing this
    // I have no idea what end-to-end test means
    smInput.mounted.call(mock)
    expect(focus).toBeCalled()
  })

  it("shows a iconHelp", () => {
    const help = "help"
    wrapper = shallowMount(smInput, {
      propsData: {
        help
      }
    })
    const iconHelp = wrapper.findComponent(smIconHelp)
    expect(iconHelp.exists()).toBe(true)
  })

  it("applies custom class and style to input element", () => {
    const inputClass = "custom-class"
    const inputStyle = "color: red;"
    wrapper = shallowMount(smInput, {
      propsData: {
        inputClass,
        inputStyle
      }
    })
    const expectedInput = wrapper.findComponent({ ref: "input" })
    expect(expectedInput.classes(inputClass)).toBe(true)
    expect(expectedInput.attributes("style")).toBe(inputStyle)
  })

  it("renders label align to left and with labelClass", () => {
    const labelClass = "custom-class"
    wrapper = shallowMount(smInput, {
      propsData: {
        label: "label",
        labelClass,
        labelAlignment: "left"
      }
    })
    const labelSpan = wrapper.find("label span.label")
    expect(wrapper.find("label").classes("inline-input")).toBe(true)
    expect(labelSpan.classes(labelClass)).toBe(true)

    const labelContainer = wrapper.find("label div.label-container")
    expect(labelContainer.classes("align-left")).toBe(true)
  })

  it("renders label align to right", () => {
    wrapper = shallowMount(smInput, {
      propsData: {
        label: "label",
        labelAlignment: "right"
      }
    })
    expect(wrapper.find("label").classes("inline-input")).toBe(true)
    expect(wrapper.find("label div.label-container").classes("align-right")).toBe(true)
  })

  it("renders label align to left and with labelContainerClass", () => {
    const labelContainerClass = "custom-class"
    wrapper = shallowMount(smInput, {
      propsData: {
        label: "label",
        labelContainerClass,
        labelAlignment: "left"
      }
    })
    expect(wrapper.find("label").classes("inline-input")).toBe(true)

    const labelContainer = wrapper.find("label div.label-container")
    expect(labelContainer.classes(labelContainerClass)).toBe(true)
    expect(labelContainer.classes("align-left")).toBe(true)
  })

  it("renders input with inputContainerClass", () => {
    const inputContainerClass = "custom-class"
    wrapper = shallowMount(smInput, {
      propsData: {
        inputContainerClass
      }
    })
    const inputContainer = wrapper.find("label div.input-wrapper")
    expect(inputContainer.classes(inputContainerClass)).toBe(true)
  })

  it("renders disabled state for loading", () => {
    wrapper = shallowMount(smInput, {
      propsData: {
        loading: true
      }
    })
    const expectedInput = wrapper.findComponent({ ref: "input" })
    expect(expectedInput.classes("disabled")).toBe(true)
  })

  it("renders a number input", () => {
    const nativeType = "number"
    wrapper = shallowMount(smInput, {
      propsData: {
        nativeType
      }
    })
    expect(wrapper.findComponent({ ref: "input" }).attributes("type")).toBe(nativeType)
  })

  it("renders pill input shape correctly", () => {
    wrapper = shallowMount(smInput, {
      propsData: { pill: true }
    })
    expect(wrapper.findComponent({ ref: "input" }).classes()).toContain("is-pill")
  })

  it("renders square input shape correctly", () => {
    wrapper = shallowMount(smInput, {
      propsData: { square: true }
    })
    expect(wrapper.findComponent({ ref: "input" }).classes()).toContain("is-square")
  })

  it("renders rounded input shape correctly", () => {
    wrapper = shallowMount(smInput, {
      propsData: { rounded: true }
    })
    expect(wrapper.findComponent({ ref: "input" }).classes()).toContain("is-rounded")
  })

  it("renders rounded-left input shape correctly", () => {
    wrapper = shallowMount(smInput, {
      propsData: { roundedLeft: true }
    })
    expect(wrapper.findComponent({ ref: "input" }).classes()).toContain("is-rounded-left")
  })

  it("renders rounded-right input shape correctly", () => {
    wrapper = shallowMount(smInput, {
      propsData: { roundedRight: true }
    })
    expect(wrapper.findComponent({ ref: "input" }).classes()).toContain("is-rounded-right")
  })

  it("should be a small input", () => {
    wrapper = shallowMount(smInput, {
      propsData: { size: "small" }
    })
    expect(wrapper.findComponent({ ref: "input" }).classes()).toContain("is-small")
  })

  it("should be a large input", () => {
    wrapper = shallowMount(smInput, {
      propsData: { size: "large" }
    })
    expect(wrapper.findComponent({ ref: "input" }).classes()).toContain("is-large")
  })

  it("hides error state", () => {
    wrapper = shallowMount(smInput, {
      propsData: {
        error: true,
        showErrorIcon: false
      }
    })
    expect(wrapper.findComponent(smIcon).exists()).toBe(false)
  })

  it("sets value", () => {
    const value = "input value"
    wrapper = shallowMount(smInput, {
      propsData: {
        value
      }
    })
    expect(wrapper.vm.$props.value).toBe(value)
    expect(wrapper.findComponent({ ref: "input" }).element.value).toBe(value)
  })
  //#endregion

  //#region Methods
  //#endregion

  //#region Events
  it("emit a input event", () => {
    const input = jest.fn()
    wrapper = shallowMount(smInput, {
      listeners: { input }
    })
    const expectedInput = wrapper.findComponent({ ref: "input" })
    expectedInput.setValue("input value")
    expectedInput.trigger("input")
    expect(input).toHaveBeenCalledTimes(2)
    expect(input).toHaveBeenCalledWith("input value")
  })
  //#endregion

  //#region Slots
  it("renders help through slot", () => {
    wrapper = shallowMount(smInput, {
      slots: {
        help: "help content"
      }
    })
    expect(wrapper.findComponent(smIconHelp).exists()).toBe(true)
  })

  it("renders content right before and after input", () => {
    wrapper = shallowMount(smInput, {
      slots: {
        before: "before content",
        after: "afer content"
      }
    })
    expect(wrapper.find(".slot-before").exists()).toBe(true)
    expect(wrapper.find(".slot-after").exists()).toBe(true)
    expect(wrapper.findComponent({ ref: "input" }).classes("shrink-2")).toBe(true)
  })

  it("renders content after input", () => {
    wrapper = shallowMount(smInput, {
      slots: {
        after: "afer content"
      }
    })
    expect(wrapper.find(".slot-after").exists()).toBe(true)
    expect(wrapper.findComponent({ ref: "input" }).classes("shrink-1")).toBe(true)
  })

  it("renders content before input", () => {
    wrapper = shallowMount(smInput, {
      slots: {
        before: "before content"
      }
    })
    expect(wrapper.find(".slot-before").exists()).toBe(true)
    expect(wrapper.findComponent({ ref: "input" }).classes("shrink-1")).toBe(true)
  })

  //#endregion
})
