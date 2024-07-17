import { AppStore } from '../../lib/create-store'
import { LoaderFunction } from 'react-router-dom'
import { getAllEmployeesInfo } from '../../lib/employees/usecases/get-all-employees-info'

export const createEmployeesLoader =
  ({ store }: { store: AppStore }): LoaderFunction =>
  async () => {
    if (!store.getState().employee.info.entities.length) {
      await store.dispatch(getAllEmployeesInfo())
    }
    return null
  }
