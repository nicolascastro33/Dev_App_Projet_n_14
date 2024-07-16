import { Link } from 'react-router-dom'

function HomeLayout({
  saveEmployee,
  savingEmployee,
  employeeCreated,
}: {
  saveEmployee(e: any): void
  savingEmployee: boolean
  employeeCreated: boolean
}) {
  return (
    <main>
      {savingEmployee && <div>Loading...</div>}
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/employees">View Current Employees</Link>
        <h2>Create Employee</h2>
        <form action="#" id="create-employee">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" />
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" />

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input id="dateOfBirth" type="text" />

          <label htmlFor="startDate">Start Date</label>
          <input id="startDate" type="text" />
          <fieldset className="adress">
            <legend>Adress</legend>
            <label htmlFor="street">Street</label>
            <input id="street" type="text" />

            <label htmlFor="city">City</label>
            <input id="city" type="text" />

            <label htmlFor="state">State</label>
            <select name="state" id="state"></select>

            <label htmlFor="zipCode">Zip Code</label>
            <input id="zipCode" type="number" />
          </fieldset>
          <label htmlFor="department">Department</label>
          <select name="department" id="department">
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>
          <button onSubmit={saveEmployee}>Save</button>
        </form>
      </div>
      {employeeCreated && (
        <div id="confirmation" className="modal">
          Employee Created!
        </div>
      )}
    </main>
  )
}

export default HomeLayout
