import { shallowMount } from "@vue/test-utils"
import smProgressCircle from "@components/Progress/ProgressCircle"
let wrapper

describe("smProgressCircle", () => {
  //#region Basic render
  it("renders default smProgressCircle", () => {
    wrapper = shallowMount(smProgressCircle)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.text()).toBe("")
    expect(wrapper.classes("show-percentage")).toBe(false)
  })
  //#endregion

  //#region Props
  it("shows percentage", () => {
    wrapper = shallowMount(smProgressCircle, {
      propsData: {
        value: 20,
        max: 200,
        showPercentage: true
      }
    })
    expect(wrapper.attributes("data-percentage")).toBe("10")
  })
  //#endregion

  //#region Methods
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  //#endregion
})
