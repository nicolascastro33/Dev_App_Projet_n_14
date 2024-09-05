import { TDataTablesFooter } from '../type'

export const DataTablesFooter = ({
  currentPage,
  dataLength,
  rowsPerPage,
  changePage,
  totalPages,
}: TDataTablesFooter) => {
  return (
    <div className="dataTablesFooter">
      <div className="numberEntries">
        Showing {currentPage} to{' '}
        {dataLength < rowsPerPage ? dataLength : rowsPerPage} of {dataLength}{' '}
        entries
      </div>
      <div className="pagination">
        <button
          id="previous"
          className={
            currentPage > 1 ? 'pagination-active' : 'pagination-inactive'
          }
          onClick={changePage}
        >
          Previous
        </button>
        <span>
          <p>{currentPage}</p>
        </span>
        <button
          id="next"
          className={
            currentPage < totalPages
              ? 'pagination-active'
              : 'pagination-inactive'
          }
          onClick={changePage}
        >
          Next
        </button>
      </div>
    </div>
  )
}
