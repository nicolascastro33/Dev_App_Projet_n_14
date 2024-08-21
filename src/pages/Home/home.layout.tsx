import SelectMenu from '../../components/SelectMenu'
import { departments } from '../../data/department-options'
import { states } from '../../data/states-options'
import { DatePicker } from '../../components/DatePicker'

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
      {isLoading && <div>Loading...</div>}
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
          <input type="date" id="dateOfBirth" name="dateOfBirth" required />

          <label htmlFor="startDate">Start Date</label>
          <input type="date" id="startDate" name="startDate" required />
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
        <DatePicker minDate={new Date('1980-01-01')} maxDate={new Date()}/>
      </div>
      {errorSaving && (
        <div className="errorSaving">There is a missing field</div>
      )}
    </main>
  )
}

export default HomeLayout
