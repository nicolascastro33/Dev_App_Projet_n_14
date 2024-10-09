import { createContext, ReactElement } from 'react'
import { useDatePicker, TUseDatePicker } from './date-picker.hook'

export const DatePickerContext = createContext<TUseDatePicker | null>(null)

export const DatePickerProvider = ({
  children,
}: {
  children: ReactElement<any, any>
}) => {
  const props = useDatePicker()
  return (
    <DatePickerContext.Provider value={props}>
      {children}
    </DatePickerContext.Provider>
  )
}
