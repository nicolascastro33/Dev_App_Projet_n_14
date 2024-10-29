import { Context, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import HomeLayout from './home.layout'
import { useDispatch } from 'react-redux'
import { addOneNewEmployee } from '../../lib/employees/usecases/add-one-new-employee'
import Modal from 'modal-component-openclassrooms'
import { AppDispatch } from '../../lib/create-store'
import { EmployeesInfo } from '../../lib/employees/model/employee.gateway'
import { MainContext, TMainContext } from '../../Provider'

function HomeController() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
  const [resetForm, setResetForm] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const { autocompleteApi } = useContext<TMainContext>(
    MainContext as Context<TMainContext>
  )

  const reset = (e: any) => {
    e.target.reset()
    setTimeout(() => {
      setResetForm(true)
    }, 100)
    setResetForm(false)
  }

  const saveEmployee = (e: any): void => {
    e.preventDefault()
    setIsLoading(true)
    const employeeFormData = new FormData(e.target)
    let thereIsMissingField = false
    employeeFormData.forEach((value) => {
      if (!value || value.toString().trim().length === 0) {
        thereIsMissingField = true
        return
      }
    })

    if (thereIsMissingField) {
      setError(true)
      setIsLoading(false)
    } else {
      dispatch(
        addOneNewEmployee({
          newEmployeeData: {
            id: uuid().slice(0, 8),
            ...(Object.fromEntries(employeeFormData.entries()) as Omit<
              EmployeesInfo,
              'id'
            >),
          },
        })
      )
        .unwrap()
        .finally(() => {
          setIsLoading(false)
          setError(false)
          setIsModalOpened(true)
          reset(e)
        })
    }
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
        autocompleteApi={autocompleteApi}
        resetForm={resetForm}
      />
    </>
  )
}

export default HomeController
