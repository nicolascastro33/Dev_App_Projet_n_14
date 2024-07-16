import { createEntityAdapter } from '@reduxjs/toolkit'

export type Employee = {
  id: number
  firstName: string
  lastName: string
  dateOfBirth: string
  startDate: string
  department: string
  street: string
  city: string
  state: string
  zipCode: string
}

export const employeeAdapter = createEntityAdapter<Employee>()
