import { shallowMount } from "@vue/test-utils"
import smHeading from "@components/Heading/Heading.vue"
let wrapper

describe("smHeading", () => {
  //#region Basic render
  it("renders default heading", () => {
    wrapper = shallowMount(smHeading)
    expect(wrapper.vm.tag).toBe("h1")
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("sets size", () => {
    wrapper = shallowMount(smHeading, {
      propsData: {
        size: "2"
      }
    })
    expect(wrapper.vm.$options.props.size.validator("a")).toBeFalsy()
    expect(wrapper.vm.tag).toBe("h2")
    wrapper.setProps({
      size: "3"
    })
    expect(wrapper.vm.tag).toBe("h3")
    wrapper.setProps({
      size: "4"
    })
    expect(wrapper.vm.tag).toBe("h4")
    wrapper.setProps({
      size: "5"
    })
    expect(wrapper.vm.tag).toBe("h5")
    wrapper.setProps({
      size: "6"
    })
    expect(wrapper.vm.tag).toBe("h6")
  })
  //#endregion

  //#region Methods
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  it("renders content", () => {
    wrapper = shallowMount(smHeading, {
      slots: {
        default: "Heading Content"
      }
    })
    expect(wrapper.text()).toBe("Heading Content")
  })
  //#endregion
})
