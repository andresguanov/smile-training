import { shallowMount } from "@vue/test-utils"
import smInnerLoading from "@components/Loading/InnerLoading.vue"
let wrapper

describe("smInnerLoading", () => {
  //#region Basic render
  it("renders default loading", () => {
    wrapper = shallowMount(smInnerLoading, {
      propsData: {
        value: true
      }
    })
    expect(wrapper.classes("loading")).toBe(true)
    expect(wrapper.classes("absolute")).toBe(false)
    expect(wrapper.find(".msg").text()).toBe(wrapper.vm.$options.props.text.default)
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("sets absolute", () => {
    wrapper = shallowMount(smInnerLoading, {
      propsData: {
        value: true,
        absolute: true
      }
    })
    expect(wrapper.classes("absolute")).toBe(true)
  })

  it("sets text", () => {
    wrapper = shallowMount(smInnerLoading, {
      propsData: {
        value: true,
        text: "Loading"
      }
    })
    expect(wrapper.find(".msg").text()).toBe("Loading")
  })
  //#endregion
})
