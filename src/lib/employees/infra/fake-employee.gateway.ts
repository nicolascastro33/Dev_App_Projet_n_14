import {
  EmployeeGateway,
  EmployeesInfo,
  GetInfoEmployeesResponse,
  GetNewEmployeesResponse,
} from '../model/employee.gateway'

export class FakeEmployeeGateway implements EmployeeGateway {
  constructor(private readonly delay = 0) {}
  allEmployees: undefined | EmployeesInfo[] = undefined
  async getEmployees(): Promise<GetInfoEmployeesResponse> {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        const employeesInfo = this.allEmployees
        if (!employeesInfo) {
          return reject()
        }
        return resolve({ employeesInfo })
      }, this.delay)
    )
  }
  async addNewEmployee({
    info,
  }: {
    info: EmployeesInfo
  }): Promise<GetNewEmployeesResponse> {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        const newEmployee = {...info, id:info.firstName + "-" + Math.floor((Math.random() * 100) + 1).toString()}
        if (!newEmployee) {
          return reject()
        }
        this.allEmployees?.push(newEmployee)
        return resolve({newEmployee})
      }, this.delay)
    )
  }
}

export const employees = new FakeEmployeeGateway()
