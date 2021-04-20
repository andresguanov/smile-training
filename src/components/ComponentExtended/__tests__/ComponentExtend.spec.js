import { mount } from "@vue/test-utils"
import smComponentExtended from "@components/ComponentExtended/ComponentExtended"
import smButton from "@components/Button/Button"
let wrapper

describe("smComponentExtended", () => {
  //#region Basic render
  it("renders button componentExtend", async () => {
    const buttonClass = "button-class"
    const style = "padding: 16px;"
    const props = {
      label: "label",
      size: "small"
    }
    const click = jest.fn()
    wrapper = mount(smComponentExtended, {
      attrs: {
        class: buttonClass,
        style,
        props,
        on: {
          click
        }
      },
      propsData: {
        component: smButton
      }
    })
    expect(wrapper.findComponent(smButton).exists()).toBe(true)
    expect(wrapper.findComponent(smButton).vm.$options.propsData).toMatchObject(props)
    await wrapper.findComponent(smButton).trigger("click")
    expect(click).toHaveBeenCalledTimes(1)
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  //#endregion

  //#region Methods
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  //#endregion
})
