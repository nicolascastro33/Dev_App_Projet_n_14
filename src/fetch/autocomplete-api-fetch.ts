export const AutocompleteApiFetch = async (searchTerm: string): Promise<any[]> => {
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