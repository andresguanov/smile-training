import { shallowMount } from "@vue/test-utils"
import smTextarea from "@components/Textarea/Textarea.vue"
import smIcon from "@components/Icon/Icon.vue"
// import smIconHelp from "@components/Icon/IconHelp.vue"
let wrapper

describe("smTextarea", () => {
  //#region Basic render
  it("renders default smTextarea", () => {
    wrapper = shallowMount(smTextarea)
    const expectedTextarea = wrapper.findComponent({ ref: "textarea" })
    expect(expectedTextarea.attributes("disabled")).toBeFalsy()
    expect(expectedTextarea.classes("is-medium")).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("renders with full-width", () => {
    wrapper = shallowMount(smTextarea, {
      propsData: {
        block: true
      }
    })
    const expectedTextarea = wrapper.findComponent({ ref: "textarea" })
    expect(expectedTextarea.classes("is-full-width")).toBe(true)
  })

  it("renders disabled state", () => {
    wrapper = shallowMount(smTextarea, {
      propsData: {
        disabled: true,
        hint: "hint",
        hintClass: "hint-class"
      }
    })
    const expectedTextarea = wrapper.findComponent({ ref: "textarea" })
    expect(expectedTextarea.attributes("disabled")).toBeTruthy()
    expect(expectedTextarea.classes("disabled")).toBe(true)
    expect(wrapper.find(".hint").classes("disabled")).toBe(true)
    expect(wrapper.find(".hint").classes("hint-class")).toBe(true)
  })

  it("renders error state", () => {
    wrapper = shallowMount(smTextarea, {
      propsData: {
        error: true,
        label: "label"
      }
    })
    expect(wrapper.findComponent({ ref: "textarea" }).classes("has-error")).toBe(true)
    expect(wrapper.find("label .label").classes("has-error")).toBe(true)
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
        textarea: {
          focus
        }
      }
    }
    // took me a very very very long time get to this
    // https://github.com/vuejs/vue-test-utils/issues/271#issuecomment-436420971
    // TODO: do this check with end-to-end test. At the moment of writing this
    // I have no idea what end-to-end test means
    smTextarea.mounted.call(mock)
    expect(focus).toBeCalled()
  })

  // it("shows a iconHelp", () => {
  //   const help = "help"
  //   wrapper = shallowMount(smTextarea, {
  //     propsData: {
  //       help
  //     }
  //   })
  //   const iconHelp = wrapper.findComponent(smIconHelp)
  //   expect(iconHelp.exists()).toBe(true)
  // })

  it("applies custom class and style to input element", () => {
    const textareaClass = "custom-class"
    const textareaStyle = "color: red;"
    wrapper = shallowMount(smTextarea, {
      propsData: {
        textareaClass,
        textareaStyle
      }
    })
    const expectedTextarea = wrapper.findComponent({ ref: "textarea" })
    expect(expectedTextarea.classes(textareaClass)).toBe(true)
    expect(expectedTextarea.attributes("style")).toBe(textareaStyle)
  })

  it("renders label align to left and with labelClass", () => {
    const labelClass = "custom-class"
    wrapper = shallowMount(smTextarea, {
      propsData: {
        label: "label",
        labelClass,
        labelAlignment: "left"
      }
    })
    const labelDiv = wrapper.find("label .label")
    expect(wrapper.find("label").classes("inline-input")).toBe(true)
    expect(labelDiv.classes(labelClass)).toBe(true)

    const labelContainer = wrapper.find("label > div.label-container")
    expect(labelContainer.classes("align-left")).toBe(true)
  })

  it("renders label align to right", () => {
    wrapper = shallowMount(smTextarea, {
      propsData: {
        label: "label",
        labelAlignment: "right"
      }
    })
    expect(wrapper.find("label").classes("inline-input")).toBe(true)
    expect(wrapper.find("label > div.label-container").classes("align-right")).toBe(true)
  })

  it("renders disabled state for loading", () => {
    wrapper = shallowMount(smTextarea, {
      propsData: {
        loading: true
      }
    })
    const expectedTextarea = wrapper.findComponent({ ref: "textarea" })
    expect(expectedTextarea.classes("disabled")).toBe(true)
  })

  it("renders pill input shape correctly", () => {
    wrapper = shallowMount(smTextarea, {
      propsData: { pill: true }
    })
    expect(wrapper.findComponent({ ref: "textarea" }).classes()).toContain("is-pill")
  })

  it("renders square input shape correctly", () => {
    wrapper = shallowMount(smTextarea, {
      propsData: { square: true }
    })
    expect(wrapper.findComponent({ ref: "textarea" }).classes()).toContain("is-square")
  })

  it("renders rounded input shape correctly", () => {
    wrapper = shallowMount(smTextarea, {
      propsData: { rounded: true }
    })
    expect(wrapper.findComponent({ ref: "textarea" }).classes()).toContain("is-rounded")
  })

  it("renders rounded-left input shape correctly", () => {
    wrapper = shallowMount(smTextarea, {
      propsData: { roundedLeft: true }
    })
    expect(wrapper.findComponent({ ref: "textarea" }).classes()).toContain("is-rounded-left")
  })

  it("renders rounded-right input shape correctly", () => {
    wrapper = shallowMount(smTextarea, {
      propsData: { roundedRight: true }
    })
    expect(wrapper.findComponent({ ref: "textarea" }).classes()).toContain("is-rounded-right")
  })

  it("should be a small input", () => {
    wrapper = shallowMount(smTextarea, {
      propsData: { size: "small" }
    })
    expect(wrapper.findComponent({ ref: "textarea" }).classes()).toContain("is-small")
  })

  it("should be a large input", () => {
    wrapper = shallowMount(smTextarea, {
      propsData: { size: "large" }
    })
    expect(wrapper.findComponent({ ref: "textarea" }).classes()).toContain("is-large")
  })

  it("hides error state", () => {
    wrapper = shallowMount(smTextarea, {
      propsData: {
        error: true,
        showErrorIcon: false
      }
    })
    expect(wrapper.findComponent(smIcon).exists()).toBe(false)
  })

  it("sets value", () => {
    const value = "input value"
    wrapper = shallowMount(smTextarea, {
      propsData: {
        value
      }
    })
    expect(wrapper.vm.$props.value).toBe(value)
    expect(wrapper.findComponent({ ref: "textarea" }).element.value).toBe(value)
  })
  //#endregion

  //#region Methods
  //#endregion

  //#region Events
  it("emit a input event", () => {
    const input = jest.fn()
    wrapper = shallowMount(smTextarea, {
      listeners: { input }
    })
    const expectedTextarea = wrapper.findComponent({ ref: "textarea" })
    expectedTextarea.setValue("input value")
    expectedTextarea.trigger("input")
    expect(input).toHaveBeenCalledTimes(2)
    expect(input).toHaveBeenCalledWith("input value")
  })
  //#endregion

  //#region Slots
  //#endregion
})
