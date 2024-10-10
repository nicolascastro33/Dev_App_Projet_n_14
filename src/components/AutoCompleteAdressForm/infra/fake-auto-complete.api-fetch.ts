export class FakeAutocompleteApiFetch {
  allAddresses: any[] = []

  getAddresses(searchTerm: string): any[] {
    if (!searchTerm.trim()) return []
    return [...this.allAddresses]
  }
}
