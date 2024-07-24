import { useEffect, useState } from 'react'
import arrow from '../assets/arrow.png'

function DataTables<Data extends object>({
  arrayData,
  columns,
}: {
  arrayData: Data[]
  columns: { title: string; field: string }[]
}) {
  const entries = [10, 25, 50, 100]

  const [data, setData] = useState<Data[]>(arrayData ? arrayData : [])

  const [rowsPerPage, setRowsPerPage] = useState<number>(entries[0])
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [sortColumn, setSortColumn] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<string>('asc')

  //#### Error sorting ####
  //Sorting
  useEffect(() => {
    if (sortColumn !== '') {
      let sortedData = Array.from(
        data.sort((firstRow, otherRow) => {
          return (firstRow as any)[sortColumn]
            .toString()
            .localeCompare((otherRow as any)[sortColumn].toString())
        })
      )
      if (sortOrder === 'desc') {
        sortedData.reverse()
      }
      setData(sortedData)
    }
  }, [sortColumn, sortOrder])

  const handleSort = (field: string) => {
    if (sortColumn === field) {
      if (sortOrder === 'desc') {
        setSortOrder('asc')
      } else {
        setSortOrder('desc')
      }
    } else {
      setSortColumn(field)
      setSortOrder('asc')
    }
  }
  //#### Error sorting ####

  // Entries
  const changeRowsPerPage = (e: any) => {
    e.preventDefault
    if (e.target.value) setRowsPerPage(e.target.value)
    return
  }

  //Pagination
  const startPoint = (currentPage - 1) * rowsPerPage
  const endPoint = currentPage * rowsPerPage
  const totalPages = Math.ceil(data.length / rowsPerPage)

  const changePage = (e: any) => {
    e.preventDefault()
    if (e.target.className === 'previous' && currentPage > 1) {
      setCurrentPage(currentPage - 1)
      return
    }
    if (e.target.className === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      return
    }
  }

  //Filering
  const filteredData = (e: any) => {
    const searchValue = e.target.value.trim().toLowerCase()
    if (!searchValue) {
      setData(arrayData)
      return
    }

    const filteredData = [] as Data[]
    arrayData.forEach((employee) => {
      let isInclude = false
      for (const [_, value] of Object.entries(employee)) {
        if (value.toLowerCase().includes(searchValue)) isInclude = true
      }
      if (isInclude) filteredData.push(employee)
    })
    setData(filteredData)
  }

  return (
    <div className="dataTables">
      <div className="dataTablesHeader">
        <form className="entriesForm" action="/">
          <label htmlFor="entries">Show </label>
          <select onInput={changeRowsPerPage} name="entries" id="entries">
            {entries.map((entrie, index) => (
              <option key={entrie + '-' + index} value={entrie}>
                {entrie}
              </option>
            ))}
          </select>
          <label htmlFor="entries">entries </label>
        </form>
        <div className="searchTable">
          <h2>Search :</h2>
          <input type="search" onInput={filteredData} />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={`columns-${column}-${index}`}>
                <button onClick={() => handleSort(column.field)}>
                  <h2>{column.title}</h2>
                  <img
                    src={arrow}
                    alt="button-filter"
                    className="buttonFilter"
                  />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td>No data available</td>
            </tr>
          ) : (
            data?.slice(startPoint, endPoint).map((employee, index) => (
              <tr key={`employee-${index}`}>
                {columns.map((column) => (
                  <td key={`column-${column.field}-${index}`}>
                    {(employee as any)[column.field]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>{' '}
      <div className="dataTablesFooter">
        <div className="numberEntries">
          Showing {currentPage} to{' '}
          {data.length < rowsPerPage ? data.length : rowsPerPage} of{' '}
          {data.length}
        </div>
        <div className="pagination">
          <button className="previous" onClick={changePage}>
            Previous
          </button>
          <span>
            <p>{currentPage}</p>
          </span>
          <button className="next" onClick={changePage}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default DataTables
