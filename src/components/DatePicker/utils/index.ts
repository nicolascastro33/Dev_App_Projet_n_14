import { dayNames } from '../consts'
import { TSelectedDate } from '../input-date/input-date-layout'

export const getNumberOfDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

export const getSortedDays = (year: number, month: number) => {
  const dayIndex = new Date(year, month, 0).getDay()
  const firstHalf = dayNames.slice(dayIndex)

  return [...firstHalf, ...dayNames.slice(0, dayIndex)]
}

export const getDayWithoutHour = () => {
  const date = new Date()
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0)
}

export const range = (start: number, end: number) => {
  const length = Math.abs((end - start) / 1)
  const { result } = Array.from({ length }).reduce(
    ({ result, current }) => ({
      result: [...result, current],
      current: current + 1,
    }),
    { result: [], current: start }
  )

  return result
}

export const getAllYears = (
  minYear: number | undefined,
  maxYear: number | undefined
) => {
  const start = minYear ? minYear : new Date().getFullYear() - 50
  const end = maxYear ? maxYear : new Date().getFullYear() + 50
  const length = Math.abs((end - start) / 1) + 1
  const { result } = Array.from({ length }).reduce(
    ({ result, current }) => ({
      result: [...result, current],
      current: current + 1,
    }),
    { result: [], current: start }
  )
  return result.reverse()
}

export const isDisabled = (
  minDate: Date | undefined,
  maxDate: Date | undefined,
  isOpen: boolean,
  year: number,
  yearOpen: number,
  month: number
) => {
  if (yearOpen === year && isOpen) {
    const start = minDate
      ? minDate
      : new Date(new Date().getFullYear() - 50, 1, 0)
    const end = maxDate
      ? maxDate
      : new Date(new Date().getFullYear() + 50, 30, 1)
    const date = new Date(year, month, 0)
    if (date.getTime() >= start.getTime() && date.getTime() <= end.getTime()) {
      return false
    }
  }
  return true
}

export const numberOfZeroYearData = (yearData: number) => {
  const array = []
  for (let i = 0; i < 4 - yearData.toString().length; i++) {
    array.push(0)
  }
  return array
}

export const isSelectedDateValid = (selectedDate: TSelectedDate) => {
  const date = new Date(
    selectedDate.year!,
    selectedDate.month! - 1,
    selectedDate.day!,
    0
  )

  return isNaN(date.getTime()) ? undefined : date
}
