import {
  EmployeeGateway,
  EmployeesInfo,
  GetInfoEmployeesResponse,
} from '../model/employee.gateway'

export class FakeEmployeeGateway implements EmployeeGateway {
  constructor(private readonly delay = 0) {}
  allEmployees: EmployeesInfo[] = []
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
  async addNewEmployee({ info }: { info: EmployeesInfo }): Promise<void> {
    await this.allEmployees?.push(info)
  }
}

export const employees = new FakeEmployeeGateway()
