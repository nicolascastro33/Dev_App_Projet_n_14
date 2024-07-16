import { createAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../../create-app-thunk'

export const getAllEmployeesInfoPending = createAction(
  'employee/getAllEmployeesInfoPending'
)

export const getAllEmployeesInfo = createAppAsyncThunk(
  'employees/getAllEmployees',
  async (_, { extra: { employeeGateway }, dispatch }) => {
    dispatch(getAllEmployeesInfoPending())
    const { employeesInfo } = await employeeGateway.getEmployees()
    return employeesInfo
  }
)
