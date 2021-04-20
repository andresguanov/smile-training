import { shallowMount, mount } from "@vue/test-utils"
import smParagraph from "@components/Paragraph/Paragraph"
let wrapper
const staticClass = "static-class"
const staticStyle = "font-size: 16px;"

describe("smParagraph", () => {
  //#region Basic render
  it("renders default smParagraph", () => {
    wrapper = shallowMount(smParagraph, {
      context: {
        props: {
          size: "small"
        },
        staticClass,
        staticStyle
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    const classes = wrapper.classes()
    expect(classes).toContain("is-small")
    expect(classes).toContain(staticClass)
    expect(wrapper.attributes("style")).toBe(staticStyle)
    expect(wrapper.text()).toBe("")
  })
  //#endregion

  //#region Props
  //#endregion

  //#region Methods
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  it("actually renders content", () => {
    wrapper = shallowMount(smParagraph, {
      slots: {
        default: "default content"
      }
    })
    expect(wrapper.text()).toBe("default content")
  })
  //#endregion
})
