import { useSelector } from 'react-redux'
import { RootState } from '../../lib/create-store'
import { selectEmployeesViewModel, ViewModelType } from './employees-viewmodal'
import { ReactNode } from 'react'
import DataTables from '../../components/DataTables'

function EmployeesLayout() {
  const viewModel = useSelector<
    RootState,
    ReturnType<typeof selectEmployeesViewModel>
  >((rootState) => selectEmployeesViewModel(rootState))

  const columns = [
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Start Date', field: 'startDate' },
    { title: 'Department', field: 'department' },
    { title: 'Date of Birth', field: 'dateOfBirth' },
    { title: 'Street', field: 'street' },
    { title: 'City', field: 'city' },
    { title: 'State', field: 'state' },
    { title: 'Zip Code', field: 'zipCode' },
  ]

  const employeeNode: ReactNode = (() => {
    switch (viewModel.info.type) {
      case ViewModelType.LoadingEmployees:
        return <div>Loading...</div>
      case ViewModelType.NoEmployees:
        return <div>No employees</div>
      case ViewModelType.WithEmployees:
        return (
          <DataTables arrayData={viewModel.info.employees} columns={columns} />
        )
    }
  })()

  return <main className="employee-page-main">{employeeNode}</main>
}

export default EmployeesLayout
