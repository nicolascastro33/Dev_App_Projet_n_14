import {
  AnyAction,
  configureStore,
  Middleware,
  ThunkDispatch,
} from '@reduxjs/toolkit'
import { EmployeeGateway } from './employees/model/employee.gateway'
import { rootReducer } from './root-reducer'

export type Dependencies = {
  employeeGateway: EmployeeGateway
}

export const createStore = (
  dependencies: Dependencies,
  preloadedState?: Partial<RootState>
) => {
  const actions: AnyAction[] = []
  const logActionsMiddleware: Middleware = () => (next) => (action) => {
    actions.push(action)
    return next(action)
  }
  const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: { extraArgument: dependencies },
      }).prepend(logActionsMiddleware)
    },
    preloadedState,
  })

  return {
    ...store,
    getActions() {
      return actions
    },
  }
}

type AppStoreWithGetActions = ReturnType<typeof createStore>
export type AppStore = Omit<AppStoreWithGetActions, 'getActions'>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>