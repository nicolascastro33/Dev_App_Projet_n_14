import { TDataTablesBody } from '../type'

export const DataTablesBody = ({
  columns,
  handleSort,
  sortColumn,
  sortOrder,
  data,
  startPoint,
  endPoint,
}: TDataTablesBody) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              onClick={() => handleSort(column.field)}
              key={`columns-${column}-${index}`}
            >
              <div className="button-filter">
                <h2>{column.title}</h2>
                <div className="all-triangles-filter">
                  <span
                    className={
                      sortColumn === column.field && sortOrder === 'asc'
                        ? 'triangle-filter-active'
                        : 'triangle-filter'
                    }
                  />
                  <span
                    className={
                      sortColumn === column.field && sortOrder === 'desc'
                        ? 'triangle-filter-active'
                        : 'triangle-filter'
                    }
                  />
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr className="no-matching">
            <td>No matching records found</td>
          </tr>
        ) : (
          data?.slice(startPoint, endPoint).map((employee, index) => (
            <tr className="tr-data" key={`employee-${index}`}>
              {columns.map((column) => (
                <td
                  className={
                    sortColumn === column.field ? 'td-active' : 'td-inactive'
                  }
                  key={`column-${column.field}-${index}`}
                >
                  {(employee as any)[column.field]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
