export type EmployeesInfo = {
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
}

export type GetInfoEmployeesResponse = {
  employeesInfo: EmployeesInfo[]
}

export interface EmployeeGateway {
  getEmployees(): Promise<GetInfoEmployeesResponse>
  addNewEmployee({ info }: { info: EmployeesInfo }):Promise<void>
}
