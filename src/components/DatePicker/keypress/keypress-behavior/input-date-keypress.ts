import {
  TInputDateBehavior,
  InputDateBehavior,
  TInputDatePropsBehavior,
} from '../../types/keypress-behavior-types'

export const InputDateKeyPressBehavior = ({
  shiftKey,
  keyPress,
  nextElement,
  prevElement,
  isButtonFocus,
  dataValue,
  maxValue,
}: TInputDatePropsBehavior): TInputDateBehavior => {
  if (Number.isNaN(Number(keyPress)) && keyPress.length === 1) {
    return { type: InputDateBehavior.InvalidData }
  }

  if (keyPress === 'Tab') {
    if (shiftKey) {
      return { type: InputDateBehavior.FocusPreviousElement }
    }
    return { type: InputDateBehavior.FocusNextElement }
  }

  if (keyPress === 'ArrowRight') {
    return nextElement
      ? { type: InputDateBehavior.FocusNextElement }
      : { type: InputDateBehavior.InvalidData }
  }
  if (keyPress === 'ArrowLeft') {
    return prevElement
      ? { type: InputDateBehavior.FocusPreviousElement }
      : { type: InputDateBehavior.InvalidData }
  }
  if (keyPress === 'Enter') {
    if (isButtonFocus) {
      return { type: InputDateBehavior.OpenOrCloseDatePicker }
    }
    if (
      nextElement?.className === 'input-date' ||
      nextElement?.className === 'input-date-button'
    ) {
      return { type: InputDateBehavior.FocusNextElement }
    }
    return { type: InputDateBehavior.InvalidData }
  }
  if (dataValue) {
    if (keyPress === 'ArrowUp') {
      return { type: InputDateBehavior.IncreaseValue }
    }
    if (keyPress === 'ArrowDown') {
      return { type: InputDateBehavior.DecreaseValue }
    }
    if (keyPress === 'Backspace') {
      return { type: InputDateBehavior.DeleteValue }
    }
    if (!Number.isNaN(Number(keyPress))) {
      const result = dataValue * 10 + Number(keyPress)
      const value = maxValue && result <= maxValue ? result : Number(keyPress)
      if (maxValue && result > maxValue && Number(keyPress) === 0) {
        return { type: InputDateBehavior.InvalidData }
      }
      if (maxValue && value * 10 > maxValue && nextElement) {
        return {
          type: InputDateBehavior.AddValidDataWhenDataThenFocusNextElement,
          value,
        }
      }
      return { type: InputDateBehavior.AddValidDataWhenData, value }
    }
  } else {
    if (keyPress === 'ArrowUp') {
      return { type: InputDateBehavior.SetMinimumValue }
    }
    if (keyPress === 'ArrowDown') {
      return { type: InputDateBehavior.SetMaximumValue }
    }
    if (keyPress === 'Backspace') {
      return { type: InputDateBehavior.InvalidData }
    }
    if (!Number.isNaN(Number(keyPress))) {
      if (maxValue && Number(keyPress) * 10 > maxValue && nextElement) {
        return {
          type: InputDateBehavior.AddValidDataWhenNoDataThenFocusNextElement,
        }
      }
      return { type: InputDateBehavior.AddValidDataWhenNoData }
    }
  }
  return { type: InputDateBehavior.InvalidData }
}
