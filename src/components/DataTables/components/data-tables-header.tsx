import { TDataTablesHeader } from '../type'

export const DataTablesHeader = ({
  changeRowsPerPage,
  entries,
  filteredData,
}: TDataTablesHeader) => {
  return (
    <div className="dataTablesHeader">
      <form className="entriesForm" action="/">
        <label htmlFor="entries">Show </label>
        <select onInput={changeRowsPerPage} name="entries" id="entries">
          {entries.map((entrie, index) => (
            <option key={`${entrie}-${index}`} value={entrie}>
              {entrie}
            </option>
          ))}
        </select>
        <label htmlFor="entries">entries </label>
      </form>
      <div className="searchTable">
        <h2>Search :</h2>
        <input type="search" onInput={filteredData} />
      </div>
    </div>
  )
}
