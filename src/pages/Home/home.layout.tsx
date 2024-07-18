import SelectMenu from '../../components/SelectMenu'
import { departments } from '../../data/department-options'
import { states } from '../../data/states-options'

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
          <input type="text" id="firstName" required />
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" required />

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input id="dateOfBirth" type="text" required />

          <label htmlFor="startDate">Start Date</label>
          <input id="startDate" type="text" required />
          <fieldset className="address">
            <legend>Address</legend>
            <label htmlFor="street">Street</label>
            <input id="street" type="text" required />

            <label htmlFor="city">City</label>
            <input id="city" type="text" required />

            <label htmlFor="state">State</label>
            <SelectMenu type="state" options={states} />
            <label htmlFor="zipCode">Zip Code</label>
            <input id="zipCode" type="number" required />
          </fieldset>
          <label htmlFor="department">Department</label>
          <SelectMenu type="department" options={departments} />
          <div className="buttonWrapper">
            <button className="saveEmployeeButton">Save</button>
          </div>
        </form>
      </div>
      {errorSaving && (
        <div className="errorSaving">There is a missing field</div>
      )}
    </main>
  )
}

export default HomeLayout
