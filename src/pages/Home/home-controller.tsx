import { useState } from 'react'
import HomeLayout from './home.layout'
import { useDispatch } from 'react-redux'
import { addOneNewEmployee } from '../../lib/employees/usecases/add-one-new-employee'
import Modal from '../../components/Modal'
import { AppDispatch } from '../../lib/create-store'
import { v4 as uuid } from 'uuid'

function HomeController() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const saveEmployee = (e: any): void => {
    e.preventDefault()
    setIsLoading(true)
    const unique_id = uuid().slice(0, 8)
    const newEmployeeData = {
      id: unique_id,
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
    for (const [_, value] of Object.entries(newEmployeeData)) {
      if (!value || value.trim().length === 0) {
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
      {isModalOpened && (
        <Modal
          setIsModalOpened={setIsModalOpened}
          message="Employee Created!"
        />
      )}
      <HomeLayout
        saveEmployee={saveEmployee}
        isLoading={isLoading}
        errorSaving={error}
      />
    </>
  )
}

export default HomeController
