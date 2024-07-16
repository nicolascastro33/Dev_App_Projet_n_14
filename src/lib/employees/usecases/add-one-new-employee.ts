import { createAppAsyncThunk } from '../../create-app-thunk'
import { EmployeesInfo } from '../model/employee.gateway'

export const addOneNewEmployee = createAppAsyncThunk(
  'employee/addOneNewEmployee',
  async (params: { newEmployeeData: Omit<EmployeesInfo, 'id'> }, { extra: { employeeGateway } }) => {
    const { newEmployee } = await employeeGateway.addNewEmployee({
      info: params.newEmployeeData,
    })
    return newEmployee
  }
)
