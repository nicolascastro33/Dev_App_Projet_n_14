import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createRouter } from './router.tsx'
import { Provider } from './Provider.tsx'
import { FakeEmployeeGateway } from './lib/employees/infra/fake-employee.gateway.ts'
import { createStore } from './lib/create-store.ts'
import { AutocompleteApiFetch } from './autocompleteApi/autocomplete-api-fetch.ts'
import { fakeEmployeeData } from './data/fake-employee.data.ts'

const employeeGateway = new FakeEmployeeGateway()
employeeGateway.allEmployees = fakeEmployeeData

const store = createStore({
  employeeGateway,
})

const router = createRouter({ store })

const autocompleteGateway = new AutocompleteApiFetch()

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
  <React.StrictMode>
    <Provider
      store={store}
      router={router}
      autocompleteApi={autocompleteGateway.getAdresses}
    />
  </React.StrictMode>
)
