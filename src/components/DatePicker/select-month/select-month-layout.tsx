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

  const clickOnYear = async (e: any, year: number) => {
    e.preventDefault()
    if (yearOpen === year) {
      setIsOpen(!isOpen)
      return
    }
    setIsOpen(false)
    setYearOpen(year)
    setIsOpen(true)
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

  const keyPressBehavior = (e: any) => {
    e.preventDefault()
    if (e.key === 'Escape') {
      setShowSelectMonth(false)
      return
    }

    const parentElement = e.target.closest('.select-month-wrapper')
    const allFocusableParentElements = parentElement.querySelectorAll(
      '[tabindex], input:not(.hidden-input), button:not(:disabled)'
    )
    const focusable = [...allFocusableParentElements] as HTMLElement[]
    const index = focusable.indexOf(e.target)
    if (e.key === 'Enter') {
      clickOnYear(e, Number(e.target.getAttribute('data-year')))
      return
    }

    if (e.key === 'ArrowUp') {
      if (index > 0) {
        if (focusable[index - 1].className === 'select-year-header') {
          focusable[index - 1].focus()
          return
        }
        if (
          index - 4 <= 0 ||
          focusable[index - 4].className === 'select-year-header'
        ) {
          e.target
            .closest(`#select-year-${yearOpen}`)
            .querySelector('.select-year-header')
            .focus()
          return
        }
        focusable[index - 4].focus()
        return
      }
      setShowSelectMonth(false)
      return
    }

    if (e.key === 'ArrowDown') {
      if (index < focusable.length - 1) {
        if (focusable[index + 1].className === 'select-year-header') {
          focusable[index + 1].focus()
          return
        }
        if (focusable[index + 4].className === 'select-year-header') {
          console.log(document.getElementById(`select-year-${yearOpen - 1}`))
          const nextFocusElement = document
            .getElementById(`select-year-${yearOpen - 1}`)
            ?.querySelector('.select-year-header') as HTMLElement
          nextFocusElement?.focus()
          return
        }
        focusable[index + 4].focus()
        return
      }
      setShowSelectMonth(false)
      return
    }

    if (e.key === 'ArrowRight') {
      if (e.target.className.includes('select-month-button')) {
        focusable[index + 1].focus()
      }
      return
    }

    if (e.key === 'ArrowLeft') {
      if (e.target.className.includes('select-month-button')) {
        focusable[index - 1].focus()
      }
      return
    }
  }

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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') clickOnYear(e, year)
                }}
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
                    disabled={isDisabled(
                      minDate,
                      maxDate,
                      isOpen,
                      year,
                      yearOpen,
                      indexMonth
                    )}
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
