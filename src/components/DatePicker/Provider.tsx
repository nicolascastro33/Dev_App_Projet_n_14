import { createContext, ReactElement } from 'react'
import { useDatePicker, TUseDatePicker } from './date-picker.hook'

export const DatePickerContext = createContext<TUseDatePicker | null>(null)

export const DatePickerProvider = ({
  children,
  minDate,
  maxDate,
}: {
  children: ReactElement<any, any>
  minDate: Date | undefined
  maxDate: Date | undefined
}) => {
  const props = useDatePicker({
    minDate,
    maxDate,
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })
  return (
    <DatePickerContext.Provider value={props}>
      {children}
    </DatePickerContext.Provider>
  )
}
