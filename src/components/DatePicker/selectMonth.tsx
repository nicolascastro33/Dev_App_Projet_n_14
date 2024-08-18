import { Dispatch, SetStateAction } from 'react'
import { getAllYears, isDisabled } from './utils'
import { useState } from 'react'
import { monthNames } from './consts'

type TShowSelectMonth = {
  currentMonth: number
  currentYear: number
  setCurrentMonth: Dispatch<SetStateAction<number>>
  setCurrentYear: Dispatch<SetStateAction<number>>
  setShowSelectMonth: Dispatch<SetStateAction<boolean>>
  maxDate: Date | undefined
  minDate: Date | undefined
}

export const SelectMonth = ({
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
  setShowSelectMonth,
  maxDate,
  minDate,
}: TShowSelectMonth) => {
  const [yearOpen, setYearOpen] = useState<number>(currentYear)
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const closeSelectMonth = (e: any) => {
    if (!e.target.closest('.select-month')) setShowSelectMonth(false)
  }

  return (
    <div className="select-month-wrapper" onClick={closeSelectMonth}>
      <div className="select-month">
        {getAllYears(minDate?.getFullYear(), maxDate?.getFullYear()).map(
          (year, indexYear) => (
            <>
              <div
                className="select-year-header"
                key={`year-${indexYear}-${year}`}
                onClick={() => {
                  if (yearOpen === year) {
                    setIsOpen(!isOpen)
                  } else {
                    setYearOpen(year)
                  }
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
                    key={year + '-' + month + '-' + indexMonth}
                    className={
                      monthNames[currentMonth] === month && currentYear === year
                        ? 'selected-month'
                        : ''
                    }
                    disabled={isDisabled(minDate, maxDate, year, indexMonth)}
                    onClick={() => {
                      setCurrentMonth(indexMonth)
                      setCurrentYear(year)
                      setShowSelectMonth(false)
                    }}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </>
          )
        )}
      </div>
    </div>
  )
}
