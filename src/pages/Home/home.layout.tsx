import SelectMenu from '../../components/SelectMenu'
import { departments } from '../../data/department-options'
import { states } from '../../data/states-options'
import { DatePicker } from '../../components/DatePicker'
import { Loader } from '../../utils/loader'

function HomeLayout({
  saveEmployee,
  isLoading,
  errorSaving,
}: {
  saveEmployee(e: any): void
  isLoading: boolean
  errorSaving: boolean
}) {
  return (
    <main>
      {isLoading && <Loader />}
      <div className="container">
        <h2>Create Employee</h2>
        <form
          action="#"
          id="create-employee"
          className="createEmployee"
          onSubmit={saveEmployee}
        >
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" required />
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" required />

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <DatePicker
            id="dateOfBirth"
            name="dateOfBirth"
            required={true}
            minDate={new Date('1980-01-01')}
            maxDate={new Date()}
          />

          <label htmlFor="startDate">Start Date</label>
          <DatePicker
            id="startDate"
            name="startDate"
            required={true}
            minDate={new Date('1980-01-01')}
            maxDate={new Date()}
          />
          <fieldset className="address">
            <legend>Address</legend>
            <label htmlFor="street">Street</label>
            <input id="street" name="street" type="text" required />

            <label htmlFor="city">City</label>
            <input id="city" name="city" type="text" required />

            <label htmlFor="state">State</label>
            <SelectMenu type="state" options={states} />
            <label htmlFor="zipCode">Zip Code</label>
            <input id="zipCode" name="zipCode" type="number" required />
          </fieldset>
          <label htmlFor="department">Department</label>
          <SelectMenu type="department" options={departments} />
          <div className="buttonWrapper">
            <button className="saveEmployeeButton" type="submit">
              Save
            </button>
          </div>
        </form>
        {errorSaving && (
          <div className="errorSaving">There is a missing field</div>
        )}
      </div>
    </main>
  )
}

export default HomeLayout
