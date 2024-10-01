import { useEffect } from 'react'
import { monthNames } from '../data/day&monthNames'
import { getAllYears, isDisabled } from '../utils'
import { TSelectMonthProps } from '../types/select-month.types'
import { SelectMonthKeyDown } from '../keypress/keypress-controller/select-month.keydown'
import { useSelectMonth } from '../hooks/select-month.hook'

export const SelectMonth = ({
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
  setShowSelectMonth,
  showSelectMonth,
  maxDate,
  minDate,
}: TSelectMonthProps) => {
  const { yearOpen, isOpen, clickOnYear } = useSelectMonth({
    yearOpen: currentYear,
  })

  const closeSelectMonth = (e: any) => {
    if (!e.target.closest('.select-month')) setShowSelectMonth(false)
  }

  useEffect(() => {
    const yearComponent = document.querySelector(`#select-year-${yearOpen}`)
    if (yearComponent) yearComponent.scrollIntoView({ behavior: 'smooth' })
  }, [yearOpen])

  const selectAMonth = (indexMonth: number, year: number) => {
    setCurrentMonth(indexMonth)
    setCurrentYear(year)
    setShowSelectMonth(false)
  }

  return (
    <div
      className="select-month-wrapper"
      onClick={closeSelectMonth}
      onKeyDown={(e: any) =>
        SelectMonthKeyDown({
          e,
          showSelectMonth,
          setShowSelectMonth,
          yearOpen,
          clickOnYear,
          selectAMonth,
        })
      }
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
                onClick={() => clickOnYear(year)}
                aria-haspopup={yearOpen !== year && !isOpen}
                aria-expanded={yearOpen === year && isOpen}
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
                    aria-label={`select ${month}-${year}`}
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
