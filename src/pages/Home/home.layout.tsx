import SelectMenu from '../../components/SelectMenu'
import { departments } from '../../data/department-options'
import { DatePicker } from '../../components/DatePicker/main'
import { Loader, LoaderWrapper } from '../../utils/loader'
import AutoCompleteAddressForm from '../../components/AutoCompleteAdressForm'

function HomeLayout({
  saveEmployee,
  isLoading,
  errorSaving,
  autocompleteApi,
  resetForm
}: {
  saveEmployee(e: any): void
  isLoading: boolean
  errorSaving: boolean
  autocompleteApi: (searchTerm: string) => Promise<any[]>
  resetForm:boolean

}) {
  return (
    <main>
      {isLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
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
            resetData={resetForm}
          />
          <label htmlFor="startDate">Start Date</label>
          <DatePicker
            id="startDate"
            name="startDate"
            required={true}
            minDate={new Date('1980-01-01')}
            maxDate={new Date()}
            resetData={resetForm}

          />
          <AutoCompleteAddressForm AddressApi={autocompleteApi} resetData={resetForm}/>

          <label htmlFor="department">Department</label>
          <SelectMenu type="department" optionsProps={departments} resetData={resetForm}/>
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
