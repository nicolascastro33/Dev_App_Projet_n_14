import { createSlice, EntityState } from '@reduxjs/toolkit'
import { Employee, employeeAdapter } from '../model/employees.entity'
import {
  getAllEmployeesInfo,
  getAllEmployeesInfoPending,
} from '../usecases/get-all-employees-info'
import { RootState } from '../../create-store'
import { addOneNewEmployee } from '../usecases/add-one-new-employee'

export type EmployeeSliceState = EntityState<Employee> & {
  loadingAllEmployees: boolean
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: employeeAdapter.getInitialState({
    loadingAllEmployees: false,
  }) as EmployeeSliceState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllEmployeesInfoPending, (state) => {
        setEmployeesInfoPending(state, {
          loading: true,
        })
      })
      .addCase(getAllEmployeesInfo.fulfilled, (state, action) => {
        const employees = action.payload
        employeeAdapter.addMany(state, employees)
        setEmployeesInfoPending(state, {
          loading: false,
        })
      })
      .addCase(addOneNewEmployee.fulfilled, (state, action) => {
        const newEmployee = action.payload(newEmployee)
        employeeAdapter.addOne(state, newEmployee)
      })
  },
})

export const setEmployeesInfoPending = (
  state: EmployeeSliceState,
  { loading }: { loading: boolean }
) => {
  state.loadingAllEmployees = loading
}

export const selectAllEmployeesInfoLoading = (state: RootState) =>
  state.employee.info.loadingAllEmployees ?? false

export const selectAllEmployeesInfo = (state: RootState) =>
  employeeAdapter.getSelectors().selectAll(state.employee.info) ?? undefined
