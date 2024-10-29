import SelectMenu from '../SelectMenu'
import useAutoComplete from './auto-complete.hook'
import { states } from '../../data/states-options'
import './style.css'

export default function AutoCompleteAddressForm({
  AddressApi,
  resetData,
}: {
  AddressApi: (searchTerm: string) => Promise<any[]>
  resetData: boolean
}) {
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
    source: (searchTerm) => AddressApi(searchTerm),
    resetData,
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
        {!isBusy && !!locations?.length && (
          <ul className="autocomplete-locations" {...bindOptions}>
            {locations.map((location, index) => (
              <li
                key={index}
                tabIndex={0}
                data-location-index={index}
                id={`location-${index}`}
                className={`autocomplete-location ${
                  selectedIndex === index && 'selected-location'
                }`}
                {...bindOption}
              >
                {location.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <label htmlFor="street">Street</label>
      <input
        type="text"
        name="street"
        value={address.street}
        {...bindOtherInputs}
        required
      />
      <label htmlFor="city">City</label>
      <input
        name="city"
        type="text"
        value={address.city}
        {...bindOtherInputs}
        required
      />
      <label htmlFor="state">State</label>
      <SelectMenu
        type="state"
        optionsProps={states}
        value={address.state}
        resetData={resetData}
      />
      <label htmlFor="zipCode">Zip Code</label>
      <input
        type="text"
        name="zipCode"
        value={address.zipCode}
        {...bindOtherInputs}
        required
      />
    </fieldset>
  )
}
