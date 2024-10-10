import { PropsWithChildren, useEffect, useId, useMemo, useState } from 'react'
import { getDayWithoutHour, isSelectedDateValid } from './utils'
import { TSelectedDate } from './types/date-picker.types'

interface Props extends PropsWithChildren<any> {
  opened?: boolean
  selectMonthOpened?: boolean
  selectedDate?: Date
  year?: number
  month?: number
  isSelectMonthYearComponentOpen?: boolean
  yearOpenInSelectMonth?: number
  minDate?: Date
  maxDate?: Date
}

const defaultProps = {
  opened: false,
  selectMonthOpened: false,
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  isSelectMonthYearComponentOpen: false,
  yearOpenInSelectMonth: new Date().getFullYear(),
}

type TSelecMonth = {
  toggleSelectMonthYearComponent: (year: number) => void
  isSelectMonthYearComponentOpen: boolean
  yearOpenInSelectMonth: number
}

type TInputDate = {
  buttonToggleId: string
  isDateValid: Date | undefined
  inputDate: TSelectedDate
  setInputDate: React.Dispatch<React.SetStateAction<TSelectedDate>>
}

export type TUseDatePicker = {
  open: () => void
  close: () => void
  toggleOpen: () => void
  openSelectMonth: () => void
  closeSelectMonth: () => void
  selectDate: (date: Date) => void
  eraseDate: () => void
  setTodayDate: () => void
  nextMonth: () => void
  prevMonth: () => void
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  selectedDate: Date | undefined
  isOpen: boolean
  showSelectMonth: boolean
  setShowSelectMonth: React.Dispatch<React.SetStateAction<boolean>>
  month: number
  year: number
  setMonth: React.Dispatch<React.SetStateAction<number>>
  setYear: React.Dispatch<React.SetStateAction<number>>
  minDate: Date | undefined
  maxDate: Date | undefined
} & TSelecMonth &
  TInputDate

export function useDatePicker(props: Props = defaultProps): TUseDatePicker {
  const [isOpen, setIsOpen] = useState<boolean>(props.opened!)
  const [showSelectMonth, setShowSelectMonth] = useState<boolean>(
    props.selectMonthOpened!
  )
  const [date, setDate] = useState<Date | undefined>(props.selectedDate)
  const [month, setMonth] = useState<number>(props.month!)
  const [year, setYear] = useState<number>(props.year!)

  useEffect(() => {
    if (date) {
      setMonth(date.getMonth())
      setYear(date.getFullYear())
    }
  }, [date])

  // Select Month Component variables
  const [isSelectMonthYearComponentOpen, setIsSelectMonthYearComponentOpen] =
    useState<boolean>(props.isSelectMonthYearComponentOpen!)
  const [yearOpenInSelectMonth, setYearOpenInSelectMonth] = useState<number>(
    props.yearOpenInSelectMonth!
  )

  // Input Date Component variables
  const [inputDate, setInputDate] = useState<TSelectedDate>({
    day: date ? date.getDate() : undefined,
    month: date ? date.getMonth() : undefined,
    year: date ? date.getFullYear() : undefined,
  })
  const buttonToggleId = useId()
  const isDateValid = useMemo<undefined | Date>(
    () => isSelectedDateValid(inputDate),
    [inputDate]
  )

  useEffect(() => {
    setDate(isDateValid)
  }, [isDateValid])

  useEffect(() => {
    if (date === isDateValid) return
    if (date) {
      setInputDate({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      })
    } else {
      setInputDate({
        day: undefined,
        month: undefined,
        year: undefined,
      })
    }
  }, [date])

  return {
    open: () => {
      setIsOpen(true)
    },
    close: () => {
      setIsOpen(false)
    },
    toggleOpen: () => {
      setIsOpen(!isOpen)
    },
    openSelectMonth: () => {
      setShowSelectMonth(true)
    },
    closeSelectMonth: () => {
      setShowSelectMonth(false)
    },
    selectDate: (date: Date) => {
      setDate(date)
      setIsOpen(false)
    },
    eraseDate: () => {
      setDate(undefined)
    },
    setTodayDate: () => {
      setDate(getDayWithoutHour)
    },
    nextMonth: () => {
      if (month < 11) {
        setMonth(month + 1)
      } else {
        setMonth(0)
        setYear(year + 1)
      }
    },
    prevMonth: () => {
      if (month > 0) {
        setMonth(month - 1)
      } else {
        setMonth(11)
        setYear(year - 1)
      }
    },
    setSelectedDate: setDate,
    selectedDate: date,
    isOpen,
    showSelectMonth,
    setShowSelectMonth,
    month,
    year,
    setMonth,
    setYear,
    toggleSelectMonthYearComponent: (year: number) => {
      if (yearOpenInSelectMonth === year) {
        setIsSelectMonthYearComponentOpen(!isSelectMonthYearComponentOpen)
        return
      }
      setIsSelectMonthYearComponentOpen(false)
      setYearOpenInSelectMonth(year)
      setIsSelectMonthYearComponentOpen(true)
    },
    isSelectMonthYearComponentOpen,
    yearOpenInSelectMonth,
    buttonToggleId,
    isDateValid,
    inputDate,
    setInputDate,
    minDate: props.minDate,
    maxDate: props.maxDate,
  }
}
