import { isNewElementInParentElement } from '../../utils'
import {
  DatePickerBehavior,
  TDatePickerBehavior,
  TDatePickerPropsBehavior,
} from '../../types/keypress-behavior-types'

export const DatePickerKeyPressBehavior = ({
  eventTarget,
  shiftKey,
  keyPress,
  nextElement,
  prevElement,
}: TDatePickerPropsBehavior): TDatePickerBehavior => {
  const isNextElementInDatePicker = isNewElementInParentElement({
    newElement: nextElement,
    parentElementClassName: 'picker-wrapper',
  })
  const isPreviousElementInDatePicker = isNewElementInParentElement({
    newElement: prevElement,
    parentElementClassName: 'picker-wrapper',
  })
  if (keyPress === 'Escape') return { type: DatePickerBehavior.CloseDatePicker }
  if (keyPress === 'Tab' && shiftKey) {
    if (!prevElement) return { type: DatePickerBehavior.InvalidData }
    if (isPreviousElementInDatePicker) {
      return {
        type: DatePickerBehavior.FocusPreviousElement,
      }
    }
    return { type: DatePickerBehavior.FocusPreviousElementAndCloseDatePicker }
  }

  if (keyPress === 'Tab' && !shiftKey) {
    if (!nextElement) return { type: DatePickerBehavior.InvalidData }
    if (isNextElementInDatePicker) {
      return {
        type: DatePickerBehavior.FocusNextElement,
      }
    }
    return {
      type: DatePickerBehavior.FocusNextElementAndCloseDatePicker,
    }
  }

  if (keyPress === 'ArrowLeft') {
    if (prevElement && isPreviousElementInDatePicker) {
      return {
        type: DatePickerBehavior.FocusPreviousElement,
      }
    }
    return { type: DatePickerBehavior.InvalidData }
  }

  if (keyPress === 'ArrowRight') {
    if (nextElement && isNextElementInDatePicker) {
      return {
        type: DatePickerBehavior.FocusNextElement,
      }
    }
    return { type: DatePickerBehavior.InvalidData }
  }

  if (keyPress === 'ArrowDown') {
    if (eventTarget.id === 'day') {
      return { type: DatePickerBehavior.ArrowDown }
    }
    if (
      eventTarget.id === 'picker-body-today-button' ||
      eventTarget.id === 'picker-body-erase-button'
    ) {
      return { type: DatePickerBehavior.FocusNextElementAndCloseDatePicker }
    }
    if (eventTarget.closest('.picker-header')) {
      return { type: DatePickerBehavior.FocusFirstDayOfTheCalendar }
    }
    return { type: DatePickerBehavior.InvalidData }
  }

  if (keyPress === 'ArrowUp') {
    if (eventTarget.id === 'day') {
      return { type: DatePickerBehavior.ArrowUp }
    }
    if (
      eventTarget.id === 'picker-body-today-button' ||
      eventTarget.id === 'picker-body-erase-button'
    ) {
      return { type: DatePickerBehavior.FocusLastDayOfTheCalendar }
    }
    if (eventTarget.closest('.picker-header')) {
      return { type: DatePickerBehavior.FocusPreviousElementAndCloseDatePicker }
    }
    return { type: DatePickerBehavior.InvalidData }
  }

  if (keyPress === 'Enter') {
    if (eventTarget.className === 'picker-header-months') {
      return { type: DatePickerBehavior.SetShowSelectMonth }
    }
    if (eventTarget.id === 'day') {
      return { type: DatePickerBehavior.HandleSelectionDate }
    }
    if (eventTarget.id === 'picker-header-previous-button') {
      return { type: DatePickerBehavior.SetPreviousMonth }
    }
    if (eventTarget.id === 'picker-header-next-button') {
      return { type: DatePickerBehavior.SetNextMonth }
    }
    if (eventTarget.id === 'picker-body-today-button') {
      return { type: DatePickerBehavior.SetTodayDate }
    }
    if (eventTarget.id === 'picker-body-erase-button') {
      return { type: DatePickerBehavior.EraseDate }
    }
    return { type: DatePickerBehavior.InvalidData }
  }

  return { type: DatePickerBehavior.InvalidData }
}
