import { mount } from "@vue/test-utils"
import smCheckbox from "@components/Checkbox/Checkbox.vue"
import smCheckboxBase from "@components/Checkbox/CheckboxBase"
import smIconHelp from "@components/Icon/IconHelp.vue"

let wrapper
const $id = id => id

describe("smCheckbox", () => {
  //#region Basic render
  it("renders default checkbox simple", () => {
    wrapper = mount(smCheckbox, {
      mocks: {
        $id
      }
    })
    const expectedLabel = wrapper.find("label")
    expect(expectedLabel.attributes("disabled")).toBeFalsy()
    expect(expectedLabel.classes("is-medium")).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("renders with full-width", () => {
    wrapper = mount(smCheckbox, {
      propsData: {
        block: true
      },
      mocks: {
        $id
      }
    })
    const expectedLabel = wrapper.find("label")
    expect(expectedLabel.classes("is-full-width")).toBe(true)
  })

  it("renders disabled state", () => {
    wrapper = mount(smCheckbox, {
      propsData: {
        disabled: true,
        hint: "hint",
        hintClass: "hint-class"
      },
      mocks: {
        $id
      }
    })
    const expectedLabel = wrapper.find("label")
    expect(expectedLabel.find("input").attributes("disabled")).toBeTruthy()
    expect(expectedLabel.classes("disabled")).toBe(true)
    expect(wrapper.find(".hint").classes("disabled")).toBe(true)
    expect(wrapper.find(".hint").classes("hint-class")).toBe(true)
  })

  it("renders error state", () => {
    wrapper = mount(smCheckbox, {
      propsData: {
        error: true
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.find("label").classes("has-error")).toBe(true)
  })

  it("sets values", async () => {
    const [trueValue, falseValue, nativeValue, value] = ["a", "b", "c", null]
    wrapper = mount(smCheckbox, {
      propsData: {
        falseValue,
        trueValue,
        nativeValue,
        value
      },
      mocks: {
        $id
      }
    })
    const expectedInput = wrapper.find("input")
    expect(expectedInput.attributes("false-value")).toBe(falseValue)
    expect(expectedInput.attributes("true-value")).toBe(trueValue)
    expect(expectedInput.attributes("value")).toBe(nativeValue)
    expect(wrapper.vm.value).toBeNull()
    await expectedInput.setChecked()
    expect(wrapper.findComponent(smCheckboxBase).vm.computedValue).toBe(trueValue)
    await expectedInput.setChecked(false)
    expect(wrapper.findComponent(smCheckboxBase).vm.computedValue).toBe(falseValue)
    await wrapper.setProps({
      indeterminate: true
    })
    expect(wrapper.findComponent(smCheckboxBase).vm.indeterminate).toBe(true)
  })

  it("shows a iconHelp", () => {
    const help = "help"
    wrapper = mount(smCheckbox, {
      propsData: {
        help
      },
      mocks: {
        $id
      }
    })
    const iconHelp = wrapper.findComponent(smIconHelp)
    expect(iconHelp.exists()).toBe(true)
  })

  it("renders disabled state for loading", () => {
    wrapper = mount(smCheckbox, {
      propsData: {
        loading: true
      },
      mocks: {
        $id
      }
    })
    const expectedLabel = wrapper.find("label")
    expect(expectedLabel.classes("disabled")).toBe(true)
  })

  it("sets name", () => {
    const name = "checkbox-name"
    wrapper = mount(smCheckbox, {
      propsData: {
        name
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.find("input").attributes("name")).toBe(name)
  })

  it("should be a small input", () => {
    wrapper = mount(smCheckbox, {
      propsData: { size: "small" },
      mocks: {
        $id
      }
    })
    expect(wrapper.find("label").classes()).toContain("is-small")
  })

  it("should be a large input", () => {
    wrapper = mount(smCheckbox, {
      propsData: { size: "large" },
      mocks: {
        $id
      }
    })
    expect(wrapper.find("label").classes()).toContain("is-large")
  })
  //#endregion

  //#region Methods
  it("set focus to input", () => {
    const focus = jest.fn()
    const mocks = {
      $refs: {
        input: {
          focus
        }
      }
    }

    // this ain't pretty but it is because of the use of $refs on htmlElment
    smCheckboxBase.mixins[2].methods.focus.call(mocks)
    expect(focus).toBeCalledTimes(1)
  })
  //#endregion

  //#region Events
  it("stops click event on input", () => {
    const click = jest.fn()
    wrapper = mount(smCheckbox, {
      listeners: { click },
      mocks: {
        $id
      }
    })
    wrapper.findComponent(smCheckbox).find("input").trigger("click")
    expect(click).toHaveBeenCalledTimes(0)
  })

  it("emits click event on from sm-container", async () => {
    const click = jest.fn()
    wrapper = mount(smCheckbox, {
      listeners: { click },
      mocks: {
        $id
      }
    })
    wrapper.findComponent(smCheckboxBase).trigger("click")
    expect(click).toHaveBeenCalledTimes(1)
  })
  //#endregion

  //#region Slots
  it("renders default slots", () => {
    // eslint-disable-next-line prettier/prettier
    const content = "<option value=\"value\">option</option>"
    wrapper = mount(smCheckbox, {
      slots: {
        default: content
      },
      mocks: {
        $id
      }
    })
    const expectedLabel = wrapper.find("label")
    expect(expectedLabel.find("option").html()).toBe(content)
  })

  it("renders help through slot", () => {
    wrapper = mount(smCheckbox, {
      slots: {
        help: "help content"
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.findComponent(smIconHelp).exists()).toBe(true)
  })

  //#endregion
})
