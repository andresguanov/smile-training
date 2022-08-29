export interface columnConfigProps {
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

export interface filterConfigProps {
  type: 'input' | 'select' | 'checkbox' | 'datepicker'
  options?: Array<{ text: string; value: any; selected?: boolean }>
  attrs?: any
}
