import { useSelector } from 'react-redux'
import { RootState } from '../../lib/create-store'
import { selectEmployeesViewModel, ViewModelType } from './employees-viewmodal'
import { ReactNode } from 'react'

function EmployeesLayout() {
  const viewModel = useSelector<
    RootState,
    ReturnType<typeof selectEmployeesViewModel>
  >((rootState) => selectEmployeesViewModel(rootState))

  const employeeNode: ReactNode = (() => {
    switch (viewModel.info.type) {
      case ViewModelType.LoadingEmployees:
        return <div>Loading...</div>
      case ViewModelType.NoEmployees:
        return <div>No employees</div>
      case ViewModelType.WithEmployees:
        return <div>With Employees</div>
    }
  })()

  return <main className="employee-page-main">{employeeNode}</main>
}

export default EmployeesLayout
