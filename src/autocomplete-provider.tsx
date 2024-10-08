import { createContext, ReactElement } from 'react'

export type TAutoCompleteContext = {
  OptionsFilter: (searchTerm: string) => Promise<any[]>
}

export const AutoCompleteContext = createContext<TAutoCompleteContext | null>(
  null
)

const AutoCompleteProvider = ({
  children,
}: {
  children: ReactElement<any, any>
}) => {
  const OptionsFilter = async (searchTerm: string): Promise<any[]> => {
    if (!searchTerm.trim()) return []
    try {
      const url = `https://us1.locationiq.com/v1/search?format=json&key=${
        import.meta.env.VITE_REACT_APP_LOCATION_IQ_API_KEY
      }&q=${searchTerm}&addressdetails=1&countrycodes=us`
      const response = await fetch(url)
      return response.json().then((res) => res)
    } catch (err) {
      console.error(err)
      return []
    }
  }

  return (
    <AutoCompleteContext.Provider value={{ OptionsFilter }}>
      {children}
    </AutoCompleteContext.Provider>
  )
}

export default AutoCompleteProvider
