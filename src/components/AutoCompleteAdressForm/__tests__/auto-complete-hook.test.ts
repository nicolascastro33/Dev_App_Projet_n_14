import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useAutoComplete from '../auto-complete.hook'
import {
  FakeAutocompleteApiFetch,
} from '../infra/fake-auto-complete.api-fetch'


const address = [
  {
    place_id: '155290442',
    licence: 'https://locationiq.com/attribution',
    osm_type: 'way',
    osm_id: '137989966',
    boundingbox: ['40.7485254', '40.7493274', '-73.968465', '-73.9677295'],
    lat: '40.7489457',
    lon: '-73.96808424536403',
    display_name:
      "United Nations Secretariat Building, 405, East 42nd Street, Manhattan Community Board 6, Manhattan, New York County, New York, New York, 10017, États-Unis d'Amérique",
    class: 'building',
    type: 'office',
    importance: 0.4298478578672752,
    address: {
      office: 'United Nations Secretariat Building',
      house_number: '405',
      road: 'East 42nd Street',
      neighbourhood: 'Manhattan Community Board 6',
      suburb: 'Manhattan',
      county: 'New York County',
      city: 'New York',
      state: 'New York',
      postcode: '10017',
      country: "États-Unis d'Amérique",
      country_code: 'us',
    },
  },
]

const FakeApi = (searchTerm: string) => {
  const fake = new FakeAutocompleteApiFetch()
  fake.allAddresses = address
  return fake.getAddresses(searchTerm)
}

const addressDetails = {
  street: address[0].address.road,
  city: address[0].address.city,
  state: address[0].address.state,
  zipCode: address[0].address.postcode,
}

describe('AutoComplete Address Hook', () => {
  it('should get all of the addresses by the Fake api', async () => {
    const { result } = renderHook(() =>
      useAutoComplete({
        source: FakeApi,
      })
    )
    expect(result.current.locations).toEqual([])
    await act(() => result.current.getlocations('s'))
    expect(result.current.locations).toStrictEqual(address)
  })

  it('should set all of the address details when selecting an address', async () => {
    const { result } = renderHook(() =>
      useAutoComplete({
        source: FakeApi,
      })
    )
    await act(() => result.current.getlocations('s'))
    act(() => result.current.selectAddress(0))
    expect(result.current.address).toEqual(addressDetails)
    expect(result.current.textValue).toEqual(address[0].display_name)
  })
})
