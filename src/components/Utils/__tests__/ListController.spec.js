import { shallowMount, mount } from "@vue/test-utils"
import smListController from "@components/Utils/ListController"

let wrapper

describe("smListController", () => {
  beforeEach(() => {
    wrapper = mount(smListController, {
      propsData: {
        listLength: 3
      },
      scopedSlots: {
        default(props) {
          const content = [0, 1, 2].map(i =>
            this.$createElement("span", {
              attrs: { id: "s" + i, selected: props.selectedIndex === i }
            })
          )
          return this.$createElement("div", content)
        }
      }
    })
  })
  //#region Basic render
  it("renders default smListController", () => {
    expect(wrapper.findAll("span").wrappers.length).toBe(3)
    expect(wrapper.html()).toMatchSnapshot()
  })
  //#endregion

  //#region Props
  //#endregion

  //#region Methods
  it("selects and clears index", async () => {
    await wrapper.vm.setSelectedIndex(0)
    expect(wrapper.find("#s0").attributes("selected")).toBe("selected")
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.vm.clearSelectedIndex()
    expect(wrapper.find("#s0").attributes("selected")).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("handles enter", async () => {
    const selected = jest.fn()
    const preventDefault = jest.fn()
    wrapper = mount(smListController, {
      propsData: {
        listLength: 3
      },
      scopedSlots: {
        default(props) {
          const content = [0, 1, 2].map(i =>
            this.$createElement("span", {
              attrs: { id: "s" + i, selected: props.selectedIndex === i }
            })
          )
          return this.$createElement("div", content)
        }
      },
      listeners: {
        selected
      }
    })
    await wrapper.vm.setSelectedIndex(0)
    await wrapper.vm.handleEnter({ preventDefault })
    expect(selected).toHaveBeenCalledWith(0)
    expect(selected).toHaveBeenCalledTimes(1)
    expect(preventDefault).toHaveBeenCalledTimes(1)
  })
  //#endregion

  //#region Events
  //#endregion

  //#region Slots
  //#endregion
})
