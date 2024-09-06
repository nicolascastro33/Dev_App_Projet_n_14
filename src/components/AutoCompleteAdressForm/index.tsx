import React from 'react'
import SelectMenu from '../SelectMenu/select-menu-controller'
import { states } from '../../data/states-options'
import {
  AutoCompleteAdressFormGateway,
  TInitialState,
} from './auto-complete-adress-form.gateway'

export class AutoCompleteAdressForm
  extends React.Component
  implements AutoCompleteAdressFormGateway
{
  state: TInitialState
  autocomplete: any
  inputRef: any
  constructor(props: any) {
    super(props)
    this.state = this.initialState()
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.foundAdressElements = this.foundAdressElements.bind(this)
    this.autocomplete = null
    this.inputRef = React.createRef()
  }

  componentDidMount(): void {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputRef.current,
      {
        types: ['geocode'],
        componentRestrictions: { country: 'US' },
      }
    )
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect)
  }

  initialState(): TInitialState {
    return {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    }
  }

  handleChange(event: any) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handlePlaceSelect() {
    const place = this.autocomplete.getPlace()
    const address = place.address_components
    const street_number = this.foundAdressElements({
      type: 'street_number',
      address,
    })
    const route = this.foundAdressElements({
      type: 'route',
      address,
    })
    const city = this.foundAdressElements({
      type: 'locality',
      address,
    })
    const state = this.foundAdressElements({
      type: 'administrative_area_level_1',
      address,
    })
    const zipCode = this.foundAdressElements({
      type: 'postal_code',
      address,
    })
    this.setState({
      street: `${street_number} ${route}`,
      city,
      state,
      zipCode,
    })
  }

  foundAdressElements({
    type,
    address,
  }: {
    type: string
    address: Array<{
      short_name: string
      long_name: string
      types: Array<string>
    }>
  }) {
    const element = address.find((element: any) =>
      element.types.includes(type)
    )?.long_name
    return element ? element : ''
  }

  render(): React.ReactNode {
    return (
      <fieldset className="address">
        <legend>Address</legend>
        <input
          type="text"
          id="autocomplete"
          className="input-field"
          placeholder="Enter your address"
          ref={this.inputRef}
        />
        <label htmlFor="street">Street</label>
        <input
          name="street"
          value={this.state.street}
          onInput={this.handleChange}
          required
        />
        <label htmlFor="city">City</label>
        <input
          name="city"
          value={this.state.city}
          required
          onInput={this.handleChange}
        />
        <label htmlFor="state">State</label>
        <SelectMenu
          type="state"
          optionsProps={states}
          value={this.state.state}
        />

        <label htmlFor="zipCode">Zip Code</label>
        <input
          name="zipCode"
          value={this.state.zipCode}
          onInput={this.handleChange}
          required
        />
      </fieldset>
    )
  }
}
