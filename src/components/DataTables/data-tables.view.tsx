import { DataTablesHeader } from './components/data-tables-header'
import { DataTablesFooter } from './components/data-tables-footer'
import { DataTablesBody } from './components/data-tables-body'
import './style.css'
import { TDataTablesView } from './type'


export const DataTablesView = ({
  columns,
  entries,
  changeRowsPerPage,
  filteredData,
  handleSort,
  changePage,
  sortColumn,
  sortOrder,
  currentPage,
  startPoint,
  endPoint,
  totalPages,
  rowsPerPage,
  data,
}: TDataTablesView) => {
  return (
    <div className="dataTables">
      <DataTablesHeader
        changeRowsPerPage={changeRowsPerPage}
        entries={entries}
        filteredData={filteredData}
      />
      <DataTablesBody
        columns={columns}
        handleSort={handleSort}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        data={data}
        startPoint={startPoint}
        endPoint={endPoint}
      />
      <DataTablesFooter
        currentPage={currentPage}
        dataLength={data.length}
        rowsPerPage={rowsPerPage}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  )
}
