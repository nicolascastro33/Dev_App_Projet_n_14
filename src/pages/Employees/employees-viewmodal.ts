import { RootState } from '../../lib/create-store'
import {
  selectAllEmployeesInfo,
  selectAllEmployeesInfoLoading,
} from '../../lib/employees/slices/employee-info'

export enum ViewModelType {
  NoEmployees = 'NO_EMPLOYEES',
  LoadingEmployees = 'LOADING_EMPLOYEES',
  WithEmployees = 'WITH_EMPLOYEES',
}

export type ViewModel = {
  info:
    | {
        type: ViewModelType.NoEmployees
      }
    | { type: ViewModelType.LoadingEmployees }
    | {
        type: ViewModelType.WithEmployees
        employees: {
          id: string
          firstName: string
          lastName: string
          dateOfBirth: string
          startDate: string
          department: string
          street: string
          city: string
          state: string
          zipCode: string
        }[]
      }
}

export const selectEmployeesViewModel = (rootState: RootState): ViewModel => {
  const isLoading = selectAllEmployeesInfoLoading(rootState)
  const employees = selectAllEmployeesInfo(rootState)

  if (isLoading) {
    return { info: { type: ViewModelType.LoadingEmployees } }
  }

  if (employees.length >= 1) {
    return { info: { type: ViewModelType.WithEmployees, employees } }
  }

  return { info: { type: ViewModelType.NoEmployees } }
}
