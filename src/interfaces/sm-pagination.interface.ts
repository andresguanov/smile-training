export interface smPaginationText {
  page?: string
  of?: string
  showing?: string
  resultsPerPage?: string
}

export interface paginationProps {
  itemsPerPage: number
  total: number
  page: number
  text: smPaginationText
  itemLimitOptions: Array<number>
  refresh: boolean
}
