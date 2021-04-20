import { shallowMount } from "@vue/test-utils"
import smTable from "@components/Table/Table.vue"
import smMarkupTable from "@components/MarkupTable/MarkupTable.vue"
import smPagination from "@components/Pagination/Pagination.vue"
import smInnerLoading from "@components/Loading/InnerLoading.vue"
import Vue from "vue"

let wrapper
let columnConfig
const $id = _ => _
const rows = [
  { id: 1, name: "Nacho", age: 33, skills: "Vue, Php" },
  { id: 2, name: "Lian", age: 25, skills: "Vue, React" },
  { id: 3, name: "Seba", age: 60, skills: "Node" },
  { id: 4, name: "Martin", age: 54, skills: "Php" },
  { id: 5, name: "Carlos", age: 18, skills: "Python" },
  { id: 6, name: "Ariana", age: 23, skills: "Javascript" },
  { id: 7, name: "Juan", age: 46, skills: "Php" },
  { id: 8, name: "Pedro", age: 55, skills: "Python" },
  { id: 9, name: "Diana", age: 66, skills: "Javascript" },
  { id: 10, name: "Zeta", age: 21, skills: "Php" },
  { id: 11, name: "Guillermo", age: 19, skills: "Python" },
  { id: 12, name: "Edgardo", age: 57, skills: "Javascript" }
]
const filterConfig = {
  name: {
    type: "input",
    attrs: {
      placeholder: "Nombre"
    }
  },
  age: {
    type: "input",
    attrs: {
      nativeType: "number",
      placeholder: "Edad"
    }
  },
  skills: {
    type: "datepicker",
    attrs: {
      placeholder: "Aptitudes"
    }
  }
}

describe("smTable", () => {
  beforeEach(() => {
    columnConfig = [
      { name: "id", firstToUpper: true, order: false, headerClass: "TEST" },
      {
        name: "name",
        label: "nombre:",
        firstToUpper: true,
        bodyAlign: "right",
        filterable: false
      },
      { name: "age", label: "edad", format: s => s.toUpperCase(), filterable: false },
      {
        name: "skills",
        label: "Aptitudes",
        headerAlign: "center",
        bodyAlign: "right",
        width: "70",
        headerStyle: {
          background: "lightblue",
          "font-size": "18px",
          fontWeight: "bold"
        },
        bodyClass: "PRUEBA",
        bodyStyle: {
          "font-size": "15px",
          fontWeight: "thin"
        },
        filterable: false
      }
    ]
  })

  //#region Basic Render
  it("renders default table", async () => {
    wrapper = shallowMount(smTable, {
      propsData: {
        rows,
        columnConfig
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.vm.localRows).toMatchObject(rows)
    expect(wrapper.findComponent(smMarkupTable).exists()).toBe(true)
    expect(wrapper.findComponent(smPagination).exists()).toBe(true)
    expect(wrapper.findComponent(smInnerLoading).exists()).toBe(true)
    expect(wrapper.find(".filters").exists()).toBe(false)
    expect(wrapper.findAll("thead th").wrappers.length).toBe(columnConfig.length)
    await Vue.nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll("tbody tr").wrappers.length).toBeLessThanOrEqual(wrapper.vm.perPage)
  })
  //#endregion

  //#region Props
  it("sets actions column's header", () => {
    const actionsColHeadText = "Actions"
    wrapper = shallowMount(smTable, {
      propsData: {
        rows,
        columnConfig,
        actionsColHeadText
      },
      scopedSlots: {
        actionsCol: "<p>row actions</p>"
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.find("thead tr th:last-child").text()).toBe(actionsColHeadText)
  })

  it("sets filters", () => {
    columnConfig[1].filterable = true
    columnConfig[2].filterable = true
    wrapper = shallowMount(smTable, {
      propsData: {
        rows,
        columnConfig,
        filterConfig
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.find(".filters").exists()).toBe(true)
  })

  it("sets perPage", () => {
    const itemsPerPage = 12
    wrapper = shallowMount(smTable, {
      propsData: {
        rows,
        columnConfig,
        itemsPerPage
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.vm.perPage).toBe(itemsPerPage)
  })

  it("disables paginate", () => {
    wrapper = shallowMount(smTable, {
      propsData: {
        rows,
        columnConfig,
        paginate: false
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.find("tfoot").exists()).toBe(false)
  })

  it("enable remote data", async () => {
    const fn = jest.fn()
    wrapper = shallowMount(smTable, {
      propsData: {
        rows,
        columnConfig,
        remoteData: true,
        itemsPerPage: 13
      },
      listeners: {
        change: fn,
        refresh: fn
      },
      mocks: {
        $id
      }
    })

    await Vue.nextTick()
    expect(wrapper.vm.getRows()).toMatchObject(rows)
    wrapper.findComponent(smPagination).vm.$emit("refresh")
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("sets rows length", () => {
    wrapper = shallowMount(smTable, {
      propsData: {
        rows,
        columnConfig,
        rowsLength: 30
      },
      mocks: {
        $id
      }
    })

    expect(wrapper.vm.totalItems).toBe(30)
  })
  //#endregion

  //#region Methods
  it("changes page", async () => {
    const change = jest.fn()
    wrapper = shallowMount(smTable, {
      propsData: {
        rows,
        columnConfig
      },
      listeners: {
        change
      },
      mocks: {
        $id
      }
    })
    wrapper.vm.onChangePage(1)
    expect(change).toHaveBeenCalledTimes(1)
    expect(change).toHaveBeenCalledWith(1)
    await wrapper.setProps({
      remoteData: true
    })
    wrapper.vm.onChangePage(1)
    expect(change).toHaveBeenCalledTimes(2)
  })
  //#endregion
  //#region Slots
  it("filter", () => {
    columnConfig[1].filterable = true
    columnConfig[2].filterable = true
    wrapper = shallowMount(smTable, {
      propsData: {
        rows,
        columnConfig,
        filterConfig
      },
      data() {
        return {
          showFilters: true
        }
      },
      slots: {
        "filter-name": "filter-name-content"
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.find(".filters").html()).toContain("filter-name-content")
  })

  it("default", () => {
    wrapper = shallowMount(smTable, {
      propsData: {
        rows,
        columnConfig
      },
      slots: {
        default: "<b id='default-slot'>default-slot-content</b>"
      },
      scopedSlots: {
        actionsCol: "<p>slot-actions</p>"
      },
      mocks: {
        $id
      }
    })
    expect(wrapper.find("#default-slot").text()).toBe("default-slot-content")
  })

  //#endregion
})
