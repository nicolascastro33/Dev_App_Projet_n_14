import { RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from 'react-redux'
import { AppStore } from './lib/create-store'
import { AppRouter } from './router'
import { createContext, ReactElement } from 'react'

export type TMainContext = {
  autocompleteApi: (searchTerm: string) => Promise<any[]>
}

export const MainContext = createContext<TMainContext | null>(null)

export const MainProvider = ({
  children,
  autocompleteApi,
}: {
  children: ReactElement<any, any>
  autocompleteApi: (searchTerm: string) => Promise<any[]>
}) => {
  const props = { autocompleteApi }
  return <MainContext.Provider value={props}>{children}</MainContext.Provider>
}

export const Provider = ({
  store,
  router,
  autocompleteApi,
}: {
  store: AppStore
  router: AppRouter
  autocompleteApi: (searchTerm: string) => Promise<any[]>
}) => (
  <MainProvider autocompleteApi={autocompleteApi}>
    <ReduxProvider store={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </ReduxProvider>
  </MainProvider>
)
