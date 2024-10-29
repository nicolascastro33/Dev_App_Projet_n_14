type AutocompleteApiFetchGateway = {
  getAdresses: (searchTerm: string) => Promise<any[]>
}

type TDataModel = {
  display_name: string
  street: string
  city: string
  state: string
  zipCode: string
}

type TDataModelProps = {
  display_name?: string
  address: {
    street?: string
    city?: string
    state?: string
    postcode?: string
    road?: string
    neighbourhood?: string
    county?: string
    village?: string
    water?: string
  }
}

const dataModel = (data: TDataModelProps[]): TDataModel[] => {
  const newData: TDataModel[] = []
  data.forEach((element) =>
    newData.push({
      display_name: element.display_name ?? '',
      street:
        element.address.road ??
        element.address.neighbourhood ??
        element.address.water ??
        '',
      city:
        element.address.city ??
        element.address.village ??
        element.address.county ??
        '',
      state: element.address.state ?? '',
      zipCode: element.address.postcode ?? '',
    })
  )
  return newData
}

export class AutocompleteApiFetch implements AutocompleteApiFetchGateway {
  async getAdresses(searchTerm: string): Promise<any[]> {
    if (!searchTerm.trim()) return []
    try {
      const url = `https://us1.locationiq.com/v1/search?format=json&key=${
        import.meta.env.VITE_REACT_APP_LOCATION_IQ_API_KEY
      }&q=${searchTerm}&addressdetails=1&countrycodes=us`
      const response = await fetch(url)
      return response.json().then((res) => {
        return dataModel(res)
      })
    } catch (err) {
      console.error(err)
      return []
    }
  }
}
