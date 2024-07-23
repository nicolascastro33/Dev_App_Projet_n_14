import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createRouter } from './router.tsx'
import { Provider } from './Provider.tsx'
import { FakeEmployeeGateway } from './lib/employees/infra/fake-employee.gateway.ts'
import { createStore } from './lib/create-store.ts'

const employeeGateway = new FakeEmployeeGateway()
employeeGateway.allEmployees = [
  {
    id: '1',
    firstName: 'Adrien',
    lastName: 'Zarick',
    dateOfBirth: '11/11/11',
    city: 'Anytown',
    street: 'whereabout',
    state: 'CA',
    zipCode: '45000',
    department: 'Sales',
    startDate: '2022-01-01',
  },
  {
    id: '2',
    firstName: 'Bertrand',
    lastName: 'Jack',
    dateOfBirth: '22/22/22',
    city: 'Bnytown',
    street: 'whereabout',
    state: 'CA',
    zipCode: '33000',
    department: 'Sales',
    startDate: '2022-01-01',
  },
  {
    id: '3',
    firstName: 'Catherine',
    lastName: 'Mickael',
    dateOfBirth: '33/33/33',
    city: 'Cnytown',
    street: 'whereabout',
    state: 'CA',
    zipCode: '12345',
    department: 'Sales',
    startDate: '2022-01-01',
  },
  {
    id: '4',
    firstName: 'Dimitrie',
    lastName: 'Oliver',
    dateOfBirth: '44/44/44',
    city: 'dnytown',
    street: 'whereabout',
    state: 'sss',
    zipCode: '55000',
    department: 'department',
    startDate: '2022-01-01',
  },
]

const store = createStore({
  employeeGateway,
})

const router = createRouter({ store })

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store} router={router} />
  </React.StrictMode>
)
