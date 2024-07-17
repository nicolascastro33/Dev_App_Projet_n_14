import { useState } from 'react'
import HomeLayout from './home.layout'
import { EmployeesInfo } from '../../lib/employees/model/employee.gateway'
import { useDispatch } from 'react-redux'
import { addOneNewEmployee } from '../../lib/employees/usecases/add-one-new-employee'
import Modal from '../../components/Modal'
import { AppDispatch } from '../../lib/create-store'

function HomeController() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [isModalOpened, setIsModalOpened] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const closeModal = () => {
    document.body.style.overflow = 'unset'
    setIsModalOpened(false)
  }

  const saveEmployee = (e: any): void => {
    e.preventDefault()
    setIsLoading(true)
    const newEmployeeData: Omit<EmployeesInfo, 'id'> = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      dateOfBirth: e.target.dateOfBirth.value,
      startDate: e.target.startDate.value,
      department: e.target.department.value,
      city: e.target.city.value,
      street: e.target.street.value,
      state: e.target.state.value,
      zipCode: e.target.zipCode.value,
    }

    for (const [value] of Object.entries(newEmployeeData)) {
      typeof value
      if (!value) {
        setError(true)
        return
      }
    }

    dispatch(addOneNewEmployee({ newEmployeeData }))
      .unwrap()
      .finally(() => {
        setIsLoading(false)
        setIsModalOpened(true)
      })
  }

  return (
    <>
      {isModalOpened && <Modal closeModalButton={closeModal} />}
      <HomeLayout
        saveEmployee={saveEmployee}
        isLoading={isLoading}
        errorSaving={error}
      />
    </>
  )
}

export default HomeController
