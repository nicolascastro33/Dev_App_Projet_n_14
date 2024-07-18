import { createAppAsyncThunk } from '../../create-app-thunk'
import { EmployeesInfo } from '../model/employee.gateway'

export const addOneNewEmployee = createAppAsyncThunk(
  'employee/addOneNewEmployee',
  async (
    params: { newEmployeeData: EmployeesInfo },
    { extra: { employeeGateway } }
  ) => {
    await employeeGateway.addNewEmployee({
      info: params.newEmployeeData,
    })
    return params.newEmployeeData
  }
)
