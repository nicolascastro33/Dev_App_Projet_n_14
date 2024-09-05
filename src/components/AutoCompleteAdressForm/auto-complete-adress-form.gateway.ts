export type TInitialState = {
    street: string
    city: string
    state: string
    zipCode: string
  }
  
  export interface AutoCompleteAdressFormGateway {
    initialState(): TInitialState
    handleChange: (e: any) => void
    handlePlaceSelect: () => void
    foundAdressElements: ({
      type,
      address,
    }: {
      type: string
      address: Array<{
        short_name: string
        long_name: string
        types: Array<string>
      }>
    }) => string
  }
  