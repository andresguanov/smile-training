import { shallowMount } from "@vue/test-utils"
import smIcon from "@components/Icon/Icon.vue"
import smAlert from "@components/Alert/Alert.vue"
let wrapper
const title = "alert title"

describe("smAlert", () => {
  //#region Basic render
  it("renders default alert", () => {
    wrapper = shallowMount(smAlert, {
      propsData: {
        title
      }
    })
    expect(wrapper.find(".is-small.title").text()).toBe(title)
    expect(wrapper.classes("bounceInRight")).toBe(true)
    expect(wrapper.classes("success")).toBe(true)
    expect(wrapper.classes("removed")).not.toBe(true)
    expect(wrapper.findComponent(smIcon).exists()).toBe(true)
    expect(wrapper.vm.timeOutCallback).not.toBeNull()
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("renders message", () => {
    const message = "alert message"
    wrapper = shallowMount(smAlert, {
      propsData: {
        title,
        message
      }
    })
    expect(wrapper.find(".content p.is-small:not(.title)").text()).toBe(message)
  })

  it("sets removed", () => {
    wrapper = shallowMount(smAlert, {
      propsData: {
        title,
        removed: true
      }
    })
    expect(wrapper.classes("removed")).toBe(true)
  })

  it("sets stacked", () => {
    wrapper = shallowMount(smAlert, {
      propsData: {
        title,
        stacked: true
      }
    })
    expect(wrapper.classes("stacked")).toBe(true)
  })

  it("sets type", async () => {
    wrapper = shallowMount(smAlert, {
      propsData: {
        title,
        type: "warning"
      }
    })
    expect(wrapper.classes("warning")).toBe(true)
    expect(wrapper.findComponent(smIcon).attributes("icon")).toBe("info")
    await wrapper.setProps({
      type: "error"
    })
    expect(wrapper.classes("error")).toBe(true)
    expect(wrapper.findComponent(smIcon).attributes("icon")).toBe("info")
    await wrapper.setProps({
      type: "info"
    })
    expect(wrapper.classes("info")).toBe(true)
    expect(wrapper.findComponent(smIcon).attributes("icon")).toBe("info")
    const validator = wrapper.vm.$options.props.type.validator
    expect(validator("not-valid-type")).toBeFalsy()
  })
  //#endregion

  //#region Methods
  it("closes alert", () => {
    const close = jest.fn()
    wrapper = shallowMount(smAlert, {
      propsData: {
        title,
        type: "warning"
      },
      listeners: {
        close
      }
    })
    wrapper.vm.close()
    expect(wrapper.vm.timeOutCallback).toBeNull()
    expect(wrapper.vm.show).toBe(false)
    expect(close).toHaveBeenCalledTimes(1)
  })
  //#endregion

  //#region Events
  it("calls close method on click", () => {
    const close = jest.fn()
    wrapper = shallowMount(smAlert, {
      propsData: {
        title,
        type: "warning"
      },
      listeners: {
        close
      }
    })
    wrapper.find(".close").trigger("click")
    expect(wrapper.vm.timeOutCallback).toBeNull()
    expect(wrapper.vm.show).toBe(false)
    expect(close).toHaveBeenCalledTimes(1)
  })
  //#endregion

  //#region Slots
  //#endregion
})
