import { monthNames } from '../../consts'
import { getAllYears, isDisabled } from '../../utils'
import { TSelectMonthLayout } from './select-month.types'

export const SelectMonthLayout = ({
  minDate,
  maxDate,
  closeSelectMonth,
  keyPressBehavior,
  clickOnYear,
  selectAMonth,
  isOpen,
  yearOpen,
  currentMonth,
  currentYear,
}: TSelectMonthLayout) => {
  return (
    <div
      className="select-month-wrapper"
      onClick={closeSelectMonth}
      onKeyDown={keyPressBehavior}
    >
      <div className="select-month">
        {getAllYears(minDate?.getFullYear(), maxDate?.getFullYear()).map(
          (year, indexYear) => (
            <div key={`year-${indexYear}-${year}`} id={`select-year-${year}`}>
              <div
                className="select-year-header"
                id={`select-${year}-header`}
                key={`year-${indexYear}-${year}`}
                data-year={year}
                tabIndex={0}
                onClick={(e) => {
                  clickOnYear(e, year)
                }}
              >
                <p>{year}</p>
              </div>
              <div
                className={`select-month-list ${
                  yearOpen === year && isOpen
                    ? 'select-month-list-open'
                    : 'select-month-list-close'
                }`}
              >
                {monthNames.map((month, indexMonth) => (
                  <button
                    key={`${year}-${month}-${indexMonth}`}
                    className={`select-month-button
                      ${
                        monthNames[currentMonth] === month &&
                        currentYear === year
                          ? 'selected-month'
                          : ''
                      }
                    `}
                    data-month={indexMonth}
                    data-year={year}
                    disabled={isDisabled(
                      minDate,
                      maxDate,
                      isOpen,
                      year,
                      yearOpen,
                      indexMonth
                    )}
                    onClick={() => selectAMonth(indexMonth, year)}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
