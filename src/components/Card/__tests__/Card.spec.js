import { shallowMount } from "@vue/test-utils"
import smCard from "@components/Card/Card.vue"
let wrapper

describe("smCard", () => {
  //#region Basic render
  it("renders default card", () => {
    wrapper = shallowMount(smCard)
    expect(wrapper.classes("shadow_small")).toBe(true)
    expect(wrapper.classes("inline-block")).toBe(false)
  })
  //#endregion

  //#region Props
  it("sets medium shadow", () => {
    wrapper = shallowMount(smCard, {
      context: {
        props: {
          elevation: 2
        }
      }
    })
    expect(wrapper.classes("shadow_medium")).toBe(true)
  })

  it("sets large shadow", () => {
    wrapper = shallowMount(smCard, {
      context: {
        props: {
          elevation: 3
        }
      }
    })
    expect(wrapper.classes("shadow_large")).toBe(true)
  })

  it("sets huge shadow", () => {
    wrapper = shallowMount(smCard, {
      context: {
        props: {
          elevation: 4
        }
      }
    })
    expect(wrapper.classes("shadow_huge")).toBe(true)
  })

  it("sets custom class", () => {
    wrapper = shallowMount(smCard, {
      context: {
        props: {
          inline: true
        }
      }
    })
    expect(wrapper.classes("inline-block")).toBe(true)
  })
  //#endregion

  //#region Methods
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  it("renders content inside card", () => {
    wrapper = shallowMount(smCard, {
      slots: {
        default: "default content"
      }
    })
    expect(wrapper.text()).toBe("default content")
  })
  //#endregion
})
