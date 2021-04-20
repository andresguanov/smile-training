import { shallowMount } from "@vue/test-utils"
import smMarkupTable from "@components/MarkupTable/MarkupTable.vue"
let wrapper

describe("smMarkupTable", () => {
  //#region Basic render
  it("renders default markup table", () => {
    wrapper = shallowMount(smMarkupTable)
    // expect(wrapper.classes("hover-effect")).toBe(true) is no longer by default
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("sets dense", () => {
    wrapper = shallowMount(smMarkupTable, {
      propsData: {
        dense: true
      }
    })
    expect(wrapper.classes("dense")).toBe(true)
  })

  it("sets separator", () => {
    wrapper = shallowMount(smMarkupTable, {
      propsData: {
        separator: "cell",
        separatorColor: "#000"
      }
    })
    expect(wrapper.classes("cell")).toBe(true)
    expect(wrapper.attributes("style")).toBe("--separator-color: #000;")
    expect(wrapper.vm.$options.props.separator.validator("diagonal")).toBeFalsy()
  })
  //#endregion

  //#region Methods
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  it("renders content", () => {
    const defaultContent = "content"
    wrapper = shallowMount(smMarkupTable, {
      slots: {
        default: defaultContent
      }
    })
    expect(wrapper.text()).toBe(defaultContent)
  })
  //#endregion
})
