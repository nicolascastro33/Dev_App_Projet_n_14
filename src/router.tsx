import { createBrowserRouter } from 'react-router-dom'
import { AppStore } from './lib/create-store'
import { createEmployeesLoader } from './pages/Employees/create-employees-loader'
import HomeController from './pages/Home/home-controller'
import EmployeesLayout from './pages/Employees/employees.layout'
import LayoutComponent from './pages/Layout'

export const createRouter = ({ store }: { store: AppStore }) =>
  createBrowserRouter([
    {
      path: '/',
      element: <LayoutComponent />,
      children: [
        {
          element: <HomeController />,
          path: '',
        },
        {
          element: <EmployeesLayout />,
          path: 'employees',
          index: true,
          loader: createEmployeesLoader({ store }),
        },
      ],
    },
  ])

export type AppRouter = ReturnType<typeof createRouter>
