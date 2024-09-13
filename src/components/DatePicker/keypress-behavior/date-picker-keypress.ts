import {
  DatePickerBehavior,
  TDatePickerBehavior,
  TDatePickerPropsBehavior,
} from './keypress-behavior-types'

export const DatePickerKeyPressBehavior = ({
  shiftKey,
  keyPress,
  nextElement,
  prevElement,
}: TDatePickerPropsBehavior): TDatePickerBehavior => {
  
  return { type: DatePickerBehavior.InvalidData }
}
