import { shallowMount, mount } from "@vue/test-utils"
import smModal from "@components/Modal/Modal"
import smIcon from "@components/Icon/Icon"
import smButton from "@components/Button/Button"
import smHeading from "@components/Heading/Heading"
let wrapper
const iconProps = {
  icon: "home",
  size: "small"
}
const buttonProps = {
  label: "Test button"
}
const headingProps = {
  size: "2"
}
const bodyText = "modal body text"
const headerText = "modal header text"
const footerText = "modal footer text"

describe("smModal", () => {
  //#region Basic render
  it("renders default smModal", () => {
    wrapper = shallowMount(smModal)
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("renders text content", () => {
    wrapper = mount(smModal, {
      propsData: {
        bodyText,
        headerText,
        footerText
      }
    })
    const header = wrapper.find(".card-header")
    expect(header.exists()).toBe(true)
    expect(header.find(".header").text()).toBe(headerText)
    const body = wrapper.find(".body")
    expect(body.exists()).toBe(true)
    expect(body.text()).toBe(bodyText)
    const footer = wrapper.find(".footer")
    expect(footer.exists()).toBe(true)
  })

  it("replace default modal root's card through prop", () => {
    wrapper = mount(smModal, {
      propsData: {
        modal: smIcon,
        modalConfig: {
          props: iconProps
        }
      }
    })
    const icon = wrapper.findComponent(smIcon)
    expect(icon.exists()).toBe(true)
    expect(icon.vm.$props).toMatchObject(iconProps)
  })
  it("replace modal's sections through props", () => {
    wrapper = mount(smModal, {
      propsData: {
        header: smHeading,
        headerConfig: {
          props: headingProps
        },
        body: smIcon,
        bodyConfig: {
          props: iconProps
        },
        footer: smButton,
        footerConfig: {
          props: buttonProps
        }
      }
    })
    const icon = wrapper.find(".body").findComponent(smIcon)
    expect(icon.exists()).toBe(true)
    expect(icon.vm.$props).toMatchObject(iconProps)
    const button = wrapper.findComponent(smButton)
    expect(button.exists()).toBe(true)
    expect(button.vm.$props).toMatchObject(buttonProps)
    const heading = wrapper.findComponent(smHeading)
    expect(heading.exists()).toBe(true)
    expect(heading.vm.$props).toMatchObject(headingProps)
  })
  //#endregion

  //#region Methods
  it("emits close", () => {
    const close = jest.fn()
    wrapper = shallowMount(smModal, {
      listeners: { close }
    })
    wrapper.find("span").trigger("click")
    expect(close).toHaveBeenCalledTimes(1)
  })
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  it("replace modal's sections through slot", () => {
    wrapper = mount(smModal, {
      slots: {
        header: headerText,
        default: bodyText,
        footer: footerText
      }
    })
    const header = wrapper.find(".card-header")
    expect(header.exists()).toBe(true)
    expect(header.find(".header").text()).toBe(headerText)
    const body = wrapper.find(".body")
    expect(body.exists()).toBe(true)
    expect(body.text()).toBe(bodyText)
    const footer = wrapper.find(".footer")
    expect(footer.exists()).toBe(true)
  })
  it("replace modal's root through slot", () => {
    wrapper = mount(smModal, {
      slots: {
        modal: "modal slot"
      }
    })
    expect(wrapper.find(".modal").text()).toBe("modal slot")
  })
  //#endregion
})
