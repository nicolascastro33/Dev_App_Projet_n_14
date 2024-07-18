import { useState } from 'react'
import { EmployeesInfo } from '../lib/employees/model/employee.gateway'

function DataTables({
  data,
  columns,
}: {
  data: EmployeesInfo[]
  columns: string[]
}) {
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  const modelisationData = (data: string) => {
    switch (data) {
      case 'First Name':
        return 'firstName'
      case 'Last Name':
        return 'lastName'
      case 'Start Date':
        return 'startDate'
      case 'Department':
        return 'department'
      case 'Date of Birth':
        return 'dateOfBirth'
      case 'Street':
        return 'street'
      case 'City':
        return 'city'
      case 'State':
        return 'state'
      case 'Zip Code':
        return 'zipCode'
      default:
        console.log('error')
    }
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={`columns-${column}-${index}`}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((employee, index) => (
            <tr key={`employee-${employee.firstName}-${index}`}>
              {columns.map((column) => {
                if (column) {
                  return (
                    <td
                      key={`column-${
                        employee[modelisationData(column)]
                      }-${index}`}
                    >
                      {employee[modelisationData(column)]}
                    </td>
                  )
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default DataTables
