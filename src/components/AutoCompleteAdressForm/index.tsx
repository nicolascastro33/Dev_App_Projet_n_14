import SelectMenu from '../SelectMenu'
import useAutoComplete from './auto-complete.hook'
import { states } from '../../data/states-options'
import './style.css'

const OptionsFilter = (searchTerm: string) => {
  const Options = [
    { value: '1', label: 'John' },
    { value: '2', label: 'Jack' },
    { value: '3', label: 'Jane' },
    { value: '4', label: 'Mike' },
  ]
  return Options.filter((option) =>
    new RegExp(`^${searchTerm}`, 'i').test(option.label)
  )
}

export default function AutoCompleteAddressForm() {
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

        {!isBusy && locations?.length > 1 && (
          <ul className="autocomplete-locations" {...bindOptions}>
            {locations.map((_, index) => (
              <li
                key={index}
                tabIndex={0}
                className={`autocomplete-location ${
                  selectedIndex === index && 'selected-location'
                }`}
                {...bindOption}
              >
                {locations[index].label}
              </li>
            ))}
          </ul>
        )}
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
