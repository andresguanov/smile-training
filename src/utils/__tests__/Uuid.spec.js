import { mount, createLocalVue } from "@vue/test-utils"
import smCheckbox from "@components/Checkbox/Checkbox"
import smCheckboxBase from "@components/Checkbox/CheckboxBase"
import uuid from "../uuid"

const localVue = createLocalVue()
localVue.use(uuid)

describe("uuid", () => {
  it("gets different ids", () => {
    let wrapper1 = mount(smCheckbox, { localVue })
    const wrapper2 = mount(smCheckbox, { localVue })
    expect(wrapper1.findComponent(smCheckboxBase).find("input").attributes("id")).not.toBe(
      wrapper2.findComponent(smCheckboxBase).find("input").attributes("id")
    )
  })
})
