import { mount } from "@vue/test-utils"
import smDatepicker from "@components/Datepicker/Datepicker"
let wrapper

describe("smDatepicker", () => {
  //#region Baisc render
  it("renders default smDatepicker", () => {
    wrapper = mount(smDatepicker, {
      propsData: {
        value: new Date(),
        locale: "en"
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion
})
