import { PropsWithChildren, useEffect, useState } from 'react'
import { getDayWithoutHour } from '../utils'


interface Props extends PropsWithChildren<any> {
  opened?: boolean
  selectMonthOpened?: boolean
  selectedDate?: Date
  year?: number
  month?: number
}

const defaultProps = {
  opened: false,
  selectMonthOpened: false,
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
}

export function useDatePicker(props: Props = defaultProps) {
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
  }
}
