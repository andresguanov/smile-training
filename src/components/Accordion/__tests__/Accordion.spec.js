import { shallowMount } from "@vue/test-utils"
import smAccordion from "@components/Accordion/Accordion.vue"
let wrapper
const sections = [
  {
    title: "Title number 1 for section",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"
  },
  {
    title: "Maybe something different",
    content:
      "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
  },
  {
    title: "Last one for the road",
    content: "Hit the road jack, and dont you look back, no more"
  }
]
const $id = id => id

describe("smAccordion", () => {
  //#region Basic render
  it("renders default accordion", () => {
    wrapper = shallowMount(smAccordion, {
      propsData: {
        sections
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.classes("bg-brand1")).toBe(true)
    expect(wrapper.findAll("li.accordion-section")).toHaveLength(sections.length)
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("sets defaultOpen", () => {
    wrapper = shallowMount(smAccordion, {
      propsData: {
        sections,
        defaultOpen: sections[2].title
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.vm.open).toBe(sections[2].title)
  })

  it("sets navClass", () => {
    const navClass = "custom-class"
    wrapper = shallowMount(smAccordion, {
      propsData: {
        sections,
        navClass
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.classes(navClass)).toBe(true)
  })
  //#endregion

  //#region Methods
  it("sets defaultOpen through", async () => {
    wrapper = shallowMount(smAccordion, {
      propsData: {
        sections,
        defaultOpen: sections[2].title
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.vm.open).toBe(sections[2].title)
    await wrapper.findAll("label").at(1).trigger("click")
    expect(wrapper.vm.open).toBe(sections[1].title)
  })
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  it("receives title and content on slots", async () => {
    wrapper = shallowMount(smAccordion, {
      propsData: {
        sections
      },
      mocks: {
        $id
      },
      scopedSlots: {
        title: "<p>{{props.title}}</p>",
        default: "<p>{{props.content}}</p>"
      }
    })
    const titles = wrapper.findAll("label p").wrappers.map(l => l.text())
    const actualTitles = sections.map(s => s.title)
    expect(titles).toMatchObject(actualTitles)
    const contents = wrapper.findAll("ul.accordion-submenu p").wrappers.map(l => l.text())
    const actualContents = sections.map(s => s.content)
    expect(contents).toMatchObject(actualContents)
  })
  //#endregion
})
