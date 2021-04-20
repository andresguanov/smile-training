import { shallowMount, createLocalVue } from "@vue/test-utils"
import smProgressBar from "@components/Progress/ProgressBar"
let wrapper
const localVue = createLocalVue()
import VueTippy from "vue-tippy"
localVue.use(VueTippy, {
  directive: "tooltip"
})

describe("smProgressBar", () => {
  //#region Basic render
  it("renders default smProgressBar", () => {
    wrapper = shallowMount(smProgressBar, {
      localVue,
      propsData: {
        value: 20
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("shows percentage", () => {
    wrapper = shallowMount(smProgressBar, {
      localVue,
      propsData: {
        value: 20,
        max: 200,
        showPercentage: true
      }
    })
    expect(wrapper.attributes("value")).toBe("10")
  })
  //#endregion

  //#region Methods
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  //#endregion
})
