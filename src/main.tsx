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
    id: 1,
    firstName: 'Johh',
    lastName: 'Doe',
    dateOfBirth: '22/22/22',
    city: 'Anytown',
    street: '',
    state: 'CA',
    zipCode: '12345',
    department: 'Sales',
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
