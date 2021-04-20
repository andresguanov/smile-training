import { shallowMount } from "@vue/test-utils"
import smPagination from "@components/Pagination/Pagination"
let wrapper

describe("smPagination", () => {
  beforeEach(() => {
    wrapper = shallowMount(smPagination, {
      propsData: {
        value: 0,
        itemsPerPage: 20,
        total: 45
      }
    })
  })
  //#region Basic render
  it("renders default smPagination", () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  it("accepts custom options", () => {
    const itemsPerPageOptions = ["20", "30", "50", "80"]
    wrapper.setProps({ itemsPerPageOptions })
    expect(wrapper.vm.selectOptions).toMatchObject(itemsPerPageOptions)
  })

  it("hides refresh", async () => {
    await wrapper.setProps({ showRefresh: false })
    expect(wrapper.find(".refresh-icon").exists()).toBe(false)
  })
  //#endregion

  //#region Methods
  it("emits change", () => {
    const change = jest.fn()
    wrapper = shallowMount(smPagination, {
      listeners: { change },
      propsData: {
        value: 0,
        itemsPerPage: 20,
        total: 45
      }
    })
    wrapper.vm.goToFirstPage()
    wrapper.vm.goToPrevPage()
    expect(change).toHaveBeenCalledTimes(0)
    wrapper.vm.goToNextPage()
    wrapper.vm.goToLastPage()
    wrapper.vm.handlePageInput(1)
    expect(change).toHaveBeenCalledTimes(3)
    wrapper.setProps({ value: 1 })
    wrapper.vm.goToPrevPage()
    wrapper.vm.goToFirstPage()
    expect(change).toHaveBeenCalledTimes(5)
  })
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  it("replace navigation icons", () => {
    const first = "first-text"
    const prev = "prev-text"
    const next = "next-text"
    const last = "last-text"
    wrapper = shallowMount(smPagination, {
      propsData: {
        value: 0,
        itemsPerPage: 20,
        total: 45
      },
      scopedSlots: {
        "first-page-icon": `<span id="first">${first}</span>`,
        "prev-page-icon": `<span id="prev">${prev}</span>`,
        "next-page-icon": `<span id="next">${next}</span>`,
        "last-page-icon": `<span id="last">${last}</span>`
      }
    })
    expect(wrapper.find("#first").exists()).toBe(true)
    expect(wrapper.find("#prev").exists()).toBe(true)
    expect(wrapper.find("#next").exists()).toBe(true)
    expect(wrapper.find("#last").exists()).toBe(true)
  })
  //#endregion
})
