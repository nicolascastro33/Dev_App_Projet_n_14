import { Dispatch, SetStateAction, useEffect } from 'react'
import { getAllYears, isDisabled } from '../utils'
import { useState } from 'react'
import { monthNames } from '../consts'

type TSelectMonth = {
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
}: TSelectMonth) => {
  const [yearOpen, setYearOpen] = useState<number>(currentYear)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const closeSelectMonth = (e: any) => {
    if (!e.target.closest('.select-month')) setShowSelectMonth(false)
  }

  useEffect(() => {
    const yearComponent = document.querySelector(`#select-year-${yearOpen}`)
    if (yearComponent) yearComponent.scrollIntoView({ behavior: 'smooth' })
  }, [yearOpen])

  const clickOnYear = async (year: number) => {
    if (yearOpen === year) {
      setIsOpen(!isOpen)
    } else {
      setIsOpen(false)
      setYearOpen(year)
      setIsOpen(true)
    }
  }

  const selectAMonth = ({
    indexMonth,
    year,
  }: {
    indexMonth: number
    year: number
  }) => {
    setCurrentMonth(indexMonth)
    setCurrentYear(year)
    setShowSelectMonth(false)
  }

  return (
    <div className="select-month-wrapper" onClick={closeSelectMonth}>
      <div className="select-month">
        {getAllYears(minDate?.getFullYear(), maxDate?.getFullYear()).map(
          (year, indexYear) => (
            <div key={`year-${indexYear}-${year}`} id={`select-year-${year}`}>
              <div
                className="select-year-header"
                key={`year-${indexYear}-${year}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') clickOnYear(year)
                }}
                onClick={() => {
                  clickOnYear(year)
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
                    disabled={
                      !isOpen && isDisabled(minDate, maxDate, year, indexMonth)
                    }
                    onClick={() => selectAMonth({ indexMonth, year })}
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
