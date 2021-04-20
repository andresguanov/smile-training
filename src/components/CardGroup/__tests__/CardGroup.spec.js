import { shallowMount } from "@vue/test-utils"
import smCardGroup from "@/components/CardGroup/CardGroup"

let wrapper

describe("smCardGroup", () => {
  //#region Basic render
  //#endregion

  //#region Props
  //#endregion

  //#region Methods
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  it("renders content inside card group", () => {
    wrapper = shallowMount(smCardGroup, {
      slots: {
        default: `
          <div id="one">One</div>
          <div id="two">Two</div>
          <div id="three">Three</div>
        `
      }
    })

    expect(wrapper.find("div[id=one]").text()).toEqual("One")
    expect(wrapper.find("div[id=two]").text()).toEqual("Two")
    expect(wrapper.find("div[id=three]").text()).toEqual("Three")
  })
  //#endregion
})
