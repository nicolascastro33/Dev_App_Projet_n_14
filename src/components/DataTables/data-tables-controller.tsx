import { useEffect, useState } from 'react'
import './style.css'
import { DataTablesView } from './data-tables.view'

function DataTables<Data extends object>({
  arrayData,
  columns,
  entries,
}: {
  arrayData: Data[]
  columns: { title: string; field: string }[]
  entries: number[]
}) {
  const [data, setData] = useState<Data[]>(arrayData ? arrayData : [])

  const [rowsPerPage, setRowsPerPage] = useState<number>(entries[0])
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [sortColumn, setSortColumn] = useState<string>(columns[0].field)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  //#### Error sorting ####
  //Sorting
  useEffect(() => {
    if (sortColumn !== '') {
      const sortedData = Array.from(
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

  // Entries
  const changeRowsPerPage = (e: any) => {
    e.preventDefault
    if (e.target.value) {
      setRowsPerPage(e.target.value)
      setCurrentPage(1)
    }
    return
  }

  //Pagination
  const startPoint = (currentPage - 1) * rowsPerPage
  const endPoint = currentPage * rowsPerPage
  const totalPages = Math.ceil(data.length / rowsPerPage)

  const changePage = (e: any) => {
    e.preventDefault()
    if (e.target.id === 'previous' && currentPage > 1) {
      setCurrentPage(currentPage - 1)
      return
    }
    if (e.target.id === 'next' && currentPage < totalPages) {
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
    <DataTablesView
      columns={columns}
      entries={entries}
      changeRowsPerPage={changeRowsPerPage}
      changePage={changePage}
      filteredData={filteredData}
      handleSort={handleSort}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
      currentPage={currentPage}
      startPoint={startPoint}
      endPoint={endPoint}
      totalPages={totalPages}
      rowsPerPage={rowsPerPage}
      data={data}
    />
  )
}

export default DataTables
