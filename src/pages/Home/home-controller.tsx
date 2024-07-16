import { useState } from 'react'
import HomeLayout from './home.layout'
import { EmployeesInfo } from '../../lib/employees/model/employee.gateway'
import { useDispatch } from 'react-redux'
import { addOneNewEmployee } from '../../lib/employees/usecases/add-one-new-employee'

function HomeController() {
  const [savingEmployee, setSavingEmployee] = useState(false)
  const [employeeCreated, setEmployeeCreated] = useState(false)
  const dispatch = useDispatch()

  const saveEmployee = (e: any): void => {
    e.preventDefault()
    setSavingEmployee(true)
    const newEmployeeData: Omit<EmployeesInfo, 'id'> = {
      firstName: e.target.firstName,
      lastName: e.target.lastName,
      dateOfBirth: e.target.dateOfBirth,
      startDate: e.target.startDate,
      department: e.target.department,
      city: e.target.city,
      street: e.target.street,
      state: e.target.state,
      zipCode: e.target.zipCode,
    }

    dispatch(addOneNewEmployee({ newEmployeeData }))
      .unwrap()
      .finally(() => {
        setSavingEmployee(false)
        setEmployeeCreated(true)
      })
  }

  return (
    <HomeLayout saveEmployee={saveEmployee} savingEmployee={savingEmployee} employeeCreated={employeeCreated} />
  )
}

export default HomeController
