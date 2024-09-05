export type TColumns = { title: string; field: string }[]

export type TDataTablesView = {
  columns: TColumns
  entries: number[]
  changeRowsPerPage: (e: any) => void
  filteredData: (e: any) => void
  handleSort: (field: string) => void
  changePage: (e: any) => void
  sortColumn: string
  sortOrder: 'asc' | 'desc'
  currentPage: number
  startPoint: number
  endPoint: number
  totalPages: number
  rowsPerPage: number
  data: object[]
}

export type TDataTablesHeader = Pick<
  TDataTablesView,
  'changeRowsPerPage' | 'entries' | 'filteredData'
>

export type TDataTablesBody = Pick<
  TDataTablesView,
  | 'columns'
  | 'handleSort'
  | 'sortColumn'
  | 'sortOrder'
  | 'data'
  | 'startPoint'
  | 'endPoint'
>

export type TDataTablesFooter = Pick<
  TDataTablesView,
  'currentPage' | 'rowsPerPage' | 'changePage' | 'totalPages'
> & { dataLength: number }
