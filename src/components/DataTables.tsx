import { useEffect, useState } from 'react'
import { EmployeesInfo } from '../lib/employees/model/employee.gateway'
import arrow from '../assets/arrow.png'

function DataTables({
  employees,
  columns,
}: {
  employees: EmployeesInfo[]
  columns: { title: string; field: string }[]
}) {
  const entries = [10, 25, 50, 100]

  const [data, setData] = useState(employees)
  const [rowsPerPage, setRowsPerPage] = useState(entries[0])
  const [currentPage, setCurrentPage] = useState(1)

  const [sortColumn, setSortColumn] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  //#### Error sorting ####
  //Sorting
  useEffect(() => {
    if (sortColumn !== '') {
      // console.log(sortColumn + ' ' + sortOrder)
      let sortedData = data.sort((firstRow, otherRow) => {
        return (firstRow as any)[sortColumn]
          .toString()
          .localeCompare((otherRow as any)[sortColumn].toString())
      })
      if (sortOrder === 'desc') {
        sortedData.reverse()
      }
      setData(sortedData)
      console.log(data)
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
      setData(employees)
      return
    }

    const filteredData = [] as EmployeesInfo[]
    employees.forEach((employee) => {
      let isInclude = false
      for (const [key, value] of Object.entries(employee)) {
        if (value.toLowerCase().includes(searchValue)) isInclude = true
      }
      if (isInclude) filteredData.push(employee)
    })
    setData(filteredData)
  }

  return (
    <>
      <div>
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
        <div>
          <h2>Search :</h2>
          <input type="text" onInput={filteredData} />
        </div>
      </div>
      <table>
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
            data.slice(startPoint, endPoint).map((employee, index) => (
              <tr key={`employee-${employee.firstName}-${index}`}>
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
      <div className="numberEntries">
        Showing {currentPage} to{' '}
        {data.length < rowsPerPage ? data.length : rowsPerPage} of {data.length}
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
    </>
  )
}

export default DataTables
