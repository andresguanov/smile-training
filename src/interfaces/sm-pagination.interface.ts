export interface paginationTextProps {
  page?: string
  of?: string
  showing?: string
  resultsPerPage?: string
}

export interface paginationProps {
  itemsPerPage?: number
  total?: number
  page: number
  text?: paginationTextProps
  itemLimitOptions?: Array<number>
  refresh?: boolean
}
