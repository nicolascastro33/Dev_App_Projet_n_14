import { useEffect } from 'react'
import { useState } from 'react'
import { SelectMonthLayout } from './select-month.layout'
import { TSelectMonthProps } from './select-month.types'
import { SelectMonthKeyDown } from './select-month.keydown'

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

  const selectAMonth = (indexMonth: number, year: number) => {
    setCurrentMonth(indexMonth)
    setCurrentYear(year)
    setShowSelectMonth(false)
  }

  return (
    <SelectMonthLayout
      minDate={minDate}
      maxDate={maxDate}
      closeSelectMonth={closeSelectMonth}
      keyPressBehavior={(e: any) =>
        SelectMonthKeyDown({
          e,
          showSelectMonth,
          setShowSelectMonth,
          yearOpen,
          clickOnYear,
          selectAMonth,
        })
      }
      selectAMonth={selectAMonth}
      clickOnYear={clickOnYear}
      isOpen={isOpen}
      yearOpen={yearOpen}
      currentMonth={currentMonth}
      currentYear={currentYear}
    />
  )
}
