import { useState } from 'react'

export function useDatePicker(
  props: { opened?: boolean; selectedDate?: Date } = { opened: false }
) {
  const [isOpen, setIsOpen] = useState(props.opened)
  const [date, setDate] = useState<Date | undefined>(props.selectedDate)

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
    selectDate: (date: Date) => {
      setDate(date)
      setIsOpen(false)
    },
    eraseDate: () => {
      setDate(undefined)
    },
    selectedDate: date,
    isOpen,
  }
}
