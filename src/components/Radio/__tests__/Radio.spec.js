import { shallowMount } from "@vue/test-utils"
import smRadio from "@components/Radio/Radio.vue"
import smIconHelp from "@components/Icon/IconHelp.vue"

let wrapper
const $id = id => id

describe("smRadio", () => {
  //#region Basic render
  it("renders default radio simple", () => {
    wrapper = shallowMount(smRadio, {
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
    wrapper = shallowMount(smRadio, {
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
    wrapper = shallowMount(smRadio, {
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
    wrapper = shallowMount(smRadio, {
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
    const [nativeValue, value] = ["nativeValue", null]
    wrapper = shallowMount(smRadio, {
      propsData: {
        nativeValue,
        value
      },
      mocks: {
        $id
      }
    })
    const expectedInput = wrapper.findComponent({ ref: "input" })
    expect(expectedInput.attributes("value")).toBe(nativeValue)
    expect(wrapper.vm.value).toBeNull()
    expect(wrapper.vm.computedValue).toBeNull()
    await expectedInput.setChecked()
    expect(wrapper.vm.computedValue).toBe(nativeValue)
  })

  it("shows a iconHelp", () => {
    const help = "help"
    wrapper = shallowMount(smRadio, {
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
    wrapper = shallowMount(smRadio, {
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
    wrapper = shallowMount(smRadio, {
      propsData: {
        name
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.findComponent({ ref: "input" }).attributes("name")).toBe(name)
  })

  it("should be a small input", () => {
    wrapper = shallowMount(smRadio, {
      propsData: { size: "small" },
      mocks: {
        $id
      }
    })
    expect(wrapper.find("label").classes()).toContain("is-small")
  })

  it("should be a large input", () => {
    wrapper = shallowMount(smRadio, {
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
    smRadio.mixins[2].methods.focus.call(mocks)
    expect(focus).toBeCalledTimes(1)
  })
  //#endregion

  //#region Events
  it("stops click event on input", () => {
    const click = jest.fn()
    wrapper = shallowMount(smRadio, {
      listeners: { click },
      mocks: {
        $id
      }
    })
    wrapper.findComponent({ ref: "input" }).trigger("click")
    expect(click).toHaveBeenCalledTimes(0)
  })

  it("emits click event on from sm-container", async () => {
    const click = jest.fn()
    wrapper = shallowMount(smRadio, {
      listeners: { click },
      mocks: {
        $id
      }
    })
    wrapper.trigger("click")
    expect(click).toHaveBeenCalledTimes(1)
  })
  //#endregion

  //#region Slots
  it("renders default slots", () => {
    // eslint-disable-next-line prettier/prettier
    const content = "<option value=\"value\">option</option>"
    wrapper = shallowMount(smRadio, {
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
    wrapper = shallowMount(smRadio, {
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
