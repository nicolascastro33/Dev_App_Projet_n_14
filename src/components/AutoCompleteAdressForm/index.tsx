import SelectMenu from '../SelectMenu'
import useAutoComplete from './auto-complete.hook'
import { states } from '../../data/states-options'
import './style.css'
import { useContext } from 'react'
import {
  AutoCompleteContext,
  TAutoCompleteContext,
} from '../../autocomplete-provider'

export default function AutoCompleteAddressForm() {
  const { OptionsFilter } = useContext(
    AutoCompleteContext
  ) as TAutoCompleteContext
  const {
    bindInput,
    bindOtherInputs,
    bindOptions,
    bindOption,
    isBusy,
    locations,
    selectedIndex,
    address,
  } = useAutoComplete({
    onChange: (value) => console.log(value),
    source: (searchTerm) => OptionsFilter(searchTerm),
  })

  return (
    <fieldset className="address">
      <div className="autocomplete-wrapper">
        <legend>Address</legend>
        <input
          type="text"
          id="autocomplete"
          className="input-field"
          placeholder="Enter your address"
          {...bindInput}
        />

        <ul className="autocomplete-locations" {...bindOptions}>
          {!isBusy &&
            !!locations?.length &&
            locations.map((location, index) => (
              <li
                key={index}
                tabIndex={0}
                className={`autocomplete-location ${
                  selectedIndex === index && 'selected-location'
                }`}
                {...bindOption}
              >
                {location.display_name}
              </li>
            ))}
        </ul>
      </div>

      <label htmlFor="street">Street</label>
      <input
        name="street"
        value={address.street}
        {...bindOtherInputs}
        required
      />
      <label htmlFor="city">City</label>
      <input name="city" value={address.city} {...bindOtherInputs} required />
      <label htmlFor="state">State</label>
      <SelectMenu type="state" optionsProps={states} value={address.state} />
      <label htmlFor="zipCode">Zip Code</label>
      <input
        name="zipCode"
        value={address.zipCode}
        {...bindOtherInputs}
        required
      />
    </fieldset>
  )
}
