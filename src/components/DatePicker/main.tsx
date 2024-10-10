import { DatePicker as DatePickerLayout } from './date-picker'
import { DatePickerProvider as Provider } from './Provider'
import { TDatePickerProps } from './types/date-picker.types'

export const DatePicker = ({
  maxDate,
  minDate,
  required,
  name,
  id,
}: TDatePickerProps) => {
  return (
    <Provider maxDate={maxDate} minDate={minDate}>
      <DatePickerLayout required={required} name={name} id={id} />
    </Provider>
  )
}
