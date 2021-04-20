import { shallowMount } from "@vue/test-utils"
import smIcon from "@components/Icon/Icon.vue"
let wrapper

describe("smIcon", () => {
  //#region Basic render
  it("renders default icon", () => {
    wrapper = shallowMount(smIcon, {
      propsData: {
        icon: "home"
      }
    })
    expect(wrapper.classes("is-medium")).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("sets width", () => {
    wrapper = shallowMount(smIcon, {
      propsData: {
        icon: "plus",
        width: "40px"
      }
    })
    expect(wrapper.attributes("style")).toBe("--color: #999999; width: 40px; height: 40px;")
  })

  it("sets height", () => {
    wrapper = shallowMount(smIcon, {
      propsData: {
        icon: "plus",
        height: "40px"
      }
    })
    expect(wrapper.attributes("style")).toBe("--color: #999999; width: 40px; height: 40px;")
  })
  it("should be a small icon", () => {
    wrapper = shallowMount(smIcon, {
      propsData: {
        icon: "plus",
        size: "small"
      }
    })
    expect(wrapper.classes()).toContain("is-small")
  })

  it("should be a large icon", () => {
    wrapper = shallowMount(smIcon, {
      propsData: {
        icon: "plus",
        size: "large"
      }
    })
    expect(wrapper.classes()).toContain("is-large")
  })
  //#endregion
})
