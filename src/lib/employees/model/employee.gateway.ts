export type EmployeesInfo = {
  id: number
  firstName: string
  lastName: string
  dateOfBirth: string
  startDate: string
  department: string
  street: string
  city: string
  state: string
  zipCode: string
}

export type GetInfoEmployeesResponse = {
  employeesInfo: EmployeesInfo[]
}

export type GetNewEmployeesResponse = {
  newEmployee: EmployeesInfo
}

export interface EmployeeGateway {
  getEmployees(): Promise<GetInfoEmployeesResponse>
  addNewEmployee({
    info,
  }: {
    info: Omit<EmployeesInfo, 'id'>
  }): Promise<GetNewEmployeesResponse>
}
