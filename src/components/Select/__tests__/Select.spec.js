import { shallowMount, mount, createLocalVue } from "@vue/test-utils"
import smSelect from "@components/Select/Select"
import smIconHelp from "@components/Icon/IconHelp.vue"
import vClickOutside from "v-click-outside"
import { TippyComponent } from "vue-tippy"

let wrapper

const localVue = createLocalVue()
localVue.directive("click-outside", vClickOutside.directive)
localVue.component("sm-tooltip", TippyComponent)

const $id = id => id

describe("smSelect", () => {
  //#region Basic render
  it("renders default smSelect", () => {
    wrapper = shallowMount(smSelect, {
      localVue,
      mocks: {
        $id
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find(".label").exists()).toBe(false)
  })
  //#endregion

  //#region Props
  it("renders disabled state", () => {
    wrapper = shallowMount(smSelect, {
      localVue,
      propsData: {
        disabled: true,
        hint: "hint",
        hintClass: "hint-class"
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.find(".input-wrapper").classes("disabled")).toBe(true)
    expect(wrapper.find(".hint").classes("disabled")).toBe(true)
    expect(wrapper.find(".hint").classes("hint-class")).toBe(true)
  })

  it("renders error state", () => {
    const labelClass = "label-class"
    wrapper = shallowMount(smSelect, {
      localVue,
      propsData: {
        error: true,
        label: "select",
        labelClass
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.find(".label").classes("has-error")).toBe(true)
    expect(wrapper.find(".label").classes(labelClass)).toBe(true)
    expect(wrapper.find(".select").classes("has-error")).toBe(true)
  })

  it("applies selectClass and selectStyle to list of options", () => {
    const selectClass = "select-class"
    const selectStyle = "padding-top: 10px;"
    wrapper = mount(smSelect, {
      localVue,
      data() {
        return {
          open: true
        }
      },
      propsData: {
        selectClass,
        selectStyle
      },
      mocks: {
        $id
      }
    })

    expect(wrapper.find(".options").classes(selectClass)).toBe(true)
    expect(wrapper.find(".options").attributes("style")).toBe(selectStyle)
  })

  it("shows a iconHelp", () => {
    const help = "help"
    wrapper = shallowMount(smSelect, {
      localVue,
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

  it("renders options", () => {
    wrapper = mount(smSelect, {
      localVue,
      data() {
        return {
          open: true
        }
      },
      propsData: {
        options: Array.apply(null, Array(10)).map((_, i) => i.toString())
      },
      mocks: {
        $id
      }
    })

    expect(wrapper.findAll("li.option").wrappers.length).toBe(10)
  })

  it("renders input for autocomplete", () => {
    wrapper = mount(smSelect, {
      localVue,
      propsData: {
        autocomplete: true
      },
      mocks: {
        $id
      }
    })

    expect(wrapper.findComponent({ ref: "input" }).exists()).toBe(true)
    expect(wrapper.find(".input-holder").exists()).toBe(false)
  })

  it("should be a small select", () => {
    wrapper = shallowMount(smSelect, {
      localVue,
      propsData: { size: "small" },
      mocks: {
        $id
      }
    })
    expect(wrapper.find(".input-wrapper").classes()).toContain("small")
  })

  it("should be a large select", () => {
    wrapper = shallowMount(smSelect, {
      localVue,
      propsData: { size: "large" },
      mocks: {
        $id
      }
    })
    expect(wrapper.find(".input-wrapper").classes()).toContain("large")
  })

  it("hides error state", () => {
    wrapper = shallowMount(smSelect, {
      localVue,
      propsData: {
        error: true,
        showErrorIcon: false
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.find(".icon-error").exists()).toBe(false)
  })
  //#endregion

  //#region Methods
  it("close list of options", () => {
    wrapper = mount(smSelect, {
      localVue,
      data() {
        return {
          open: true
        }
      },
      propsData: {
        options: Array.apply(null, Array(10)).map((_, i) => i.toString())
      },
      mocks: {
        $id
      }
    })
    wrapper.vm.closeSelect()
    expect(wrapper.vm.open).toBe(false)
  })

  it("gets input text", () => {
    const option = { client: { name: "Lian" } }
    wrapper = shallowMount(smSelect, {
      localVue,
      propsData: {
        textField: "client.name"
      },
      mocks: {
        $id
      }
    })
    expect(typeof wrapper.vm.getInputText(3)).toBe("string")
    expect(typeof wrapper.vm.getInputText(option)).toBe("string")
    expect(wrapper.vm.getInputText(option)).toBe("Lian")
  })
  it("selects option", async () => {
    const option = { text: "Lian" }
    const input = jest.fn()
    wrapper = shallowMount(smSelect, {
      localVue,
      listeners: { input },
      mocks: {
        $id
      }
    })
    wrapper.vm.selectOption(option)
    expect(input).toHaveBeenCalledTimes(1)
    expect(input).toHaveBeenCalledWith(option)
    await wrapper.setProps({ multiple: true, multipleSeparator: "|" })
    wrapper.vm.selectOption(option)
    wrapper.vm.selectOption({ text: "lian", value: 2 })
    expect(input).toHaveBeenCalledTimes(3)
    expect(wrapper.vm.inputText).toBe("Lian|lian")
  })
  it("emits last selected option when it is multiple", () => {
    const option1 = { text: "opt1" }
    const option2 = { text: "opt2" }
    const input = jest.fn()
    wrapper = shallowMount(smSelect, {
      localVue,
      propsData: {
        multiple: true
      },
      listeners: { input },
      mocks: {
        $id
      }
    })
    wrapper.vm.selectOption(option1)
    wrapper.vm.selectOption(option2)
    expect(input.mock.calls[1][1]).toMatchObject(option2)
  })
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  it("renders help through slot", () => {
    wrapper = shallowMount(smSelect, {
      localVue,
      slots: {
        help: "help content"
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.findComponent(smIconHelp).exists()).toBe(true)
  })
  it("renders option slot", () => {
    wrapper = mount(smSelect, {
      localVue,
      data() {
        return {
          open: true
        }
      },
      propsData: {
        options: ["option"]
      },
      mocks: {
        $id
      },
      scopedSlots: {
        option(props) {
          return this.$createElement("p", props.option)
        }
      }
    })
    expect(wrapper.find(".option").html()).toMatchSnapshot()
  })
  it("renders option header and footer slot", () => {
    wrapper = mount(smSelect, {
      localVue,
      data() {
        return {
          open: true
        }
      },
      mocks: {
        $id
      },
      slots: {
        optionHeader: "<span id='optionHeader' />",
        optionFooter: "<span id='optionFooter' />"
      }
    })
    expect(wrapper.find(".options #optionHeader").exists()).toBe(true)
    expect(wrapper.find(".options #optionFooter").exists()).toBe(true)
    expect(wrapper.find(".options").html()).toMatchSnapshot()
  })
  it("renders options slot", () => {
    wrapper = mount(smSelect, {
      localVue,
      data() {
        return {
          open: true
        }
      },
      mocks: {
        $id
      },
      propsData: {
        options: ["option"]
      },
      scopedSlots: {
        options(props) {
          return this.$createElement("p", [props.options, props.selectedIndex])
        }
      }
    })
    expect(wrapper.find(".select-menu p").exists()).toBe(true)
    expect(wrapper.find(".select-menu").html()).toMatchSnapshot()
  })
  //#endregion
})
