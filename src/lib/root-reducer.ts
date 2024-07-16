import { combineReducers } from '@reduxjs/toolkit'
import { reducer as employeesReducer } from './employees/reducer'

export const rootReducer = combineReducers({
  employee: employeesReducer,
})
