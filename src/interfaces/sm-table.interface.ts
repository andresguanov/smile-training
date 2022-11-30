export interface smTableColumn {
  name: string
  label?: string
  format?: (e: string) => string
  filterable?: boolean
  width?: string
  order?: boolean
  firstToUpper?: boolean
  headerAlign?: 'left' | 'right' | 'center'
  headerClass?: string
  bodyAlign?: 'left' | 'right' | 'center'
  bodyClass?: string
}

export interface smTableFilter {
  type: 'input' | 'select' | 'checkbox' | 'datepicker'
  options?: Array<{ text: string; value: any; selected?: boolean }>
  attrs?: any
}

export interface smTableChangeEvent {
  start: number
  to: number
  limit: number
  order_field: string
  order_direction: string
  filters: {
    [key: string]: any
  }
}
