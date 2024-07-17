import { EmployeesInfo } from '../lib/employees/model/employee.gateway'

function DataTables({ data }: { data: EmployeesInfo[] | undefined }) {
  return (
    <div>
      {data?.map((employee, index) => (
        <p key={index}>
          {employee.firstName} {employee.lastName}
        </p>
      ))}
    </div>
  )
}

export default DataTables
