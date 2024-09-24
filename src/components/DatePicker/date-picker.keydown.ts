import { TDatePickerKeyDownProps } from './date-picker.types'
import { DatePickerKeyPressBehavior } from './keypress-behavior/date-picker-keypress'
import { DatePickerBehavior } from './keypress-behavior/keypress-behavior-types'

export const DatePickerKeyDown = ({
  e,
  showSelectMonth,
  closeDatePicker,
  setShowSelectMonth,
  handleSelection,
  previousMonth,
  nextMonth,
  setTodayDate,
  eraseDate,
}: TDatePickerKeyDownProps) => {
  if (showSelectMonth) return
  e.preventDefault()
  const allFocusableElements = document.querySelectorAll(
    '[tabindex], input:not(.hidden-input), button:not(:disabled)'
  )
  const focusable = [...allFocusableElements] as HTMLElement[]
  const index = focusable.indexOf(e.target)
  const nextElement = focusable[index + 1]
  const prevElement = focusable[index - 1]
  const keyPressBehavior = DatePickerKeyPressBehavior({
    eventTarget: e.target,
    shiftKey: e.shiftKey,
    keyPress: e.key,
    nextElement,
    prevElement,
  })

  const allFocusElementsInParentElement = focusable.filter((element) =>
    element.closest('.picker-wrapper')
  )
  const indexInParentElement = allFocusElementsInParentElement.indexOf(e.target)
  const length = allFocusElementsInParentElement.length - 1
  const firstElementAfterParentElementIndex =
    focusable.indexOf(allFocusElementsInParentElement[length]) + 1

  switch (keyPressBehavior.type) {
    case DatePickerBehavior.CloseDatePicker:
      const buttonOpeningDatePicker = e.target
        .closest('.date-picker')
        .querySelector('.input-date-button')
      closeDatePicker()
      buttonOpeningDatePicker?.focus()
      return
    case DatePickerBehavior.FocusPreviousElement:
      prevElement.focus()
      return
    case DatePickerBehavior.FocusPreviousElementAndCloseDatePicker:
      const firstElementBeforeParentElementIndex =
        focusable.indexOf(allFocusElementsInParentElement[0]) - 1
      focusable[firstElementBeforeParentElementIndex].focus()
      closeDatePicker()
      return
    case DatePickerBehavior.FocusNextElement:
      nextElement.focus()
      return
    case DatePickerBehavior.FocusNextElementAndCloseDatePicker:
      focusable[firstElementAfterParentElementIndex].focus()
      closeDatePicker()
      return
    case DatePickerBehavior.FocusFirstDayOfTheCalendar:
      const firstDay = allFocusElementsInParentElement.find(
        (element) => element.getAttribute('data-day') === '1'
      )
      firstDay?.focus()
      return
    case DatePickerBehavior.FocusLastDayOfTheCalendar:
      const days = allFocusElementsInParentElement.filter((element) =>
        element.getAttribute('data-day')
      )
      const lastDay = days[days.length - 1]
      lastDay.focus()
      return
    case DatePickerBehavior.ArrowUp:
      allFocusElementsInParentElement[
        indexInParentElement - 7 < 0 ? 0 : indexInParentElement - 7
      ].focus()
      return
    case DatePickerBehavior.ArrowDown:
      allFocusElementsInParentElement[
        indexInParentElement + 7 > length
          ? length - 1
          : indexInParentElement + 7
      ].focus()
      return
    case DatePickerBehavior.SetShowSelectMonth:
      setShowSelectMonth(!showSelectMonth)
      return
    case DatePickerBehavior.HandleSelectionDate:
      focusable[firstElementAfterParentElementIndex].focus()
      handleSelection(e)
      return
    case DatePickerBehavior.SetPreviousMonth:
      previousMonth(e)
      return
    case DatePickerBehavior.SetNextMonth:
      nextMonth(e)
      return
    case DatePickerBehavior.SetTodayDate:
      focusable[firstElementAfterParentElementIndex].focus()
      setTodayDate(e)
      return
    case DatePickerBehavior.EraseDate:
      eraseDate(e)
      return
    case DatePickerBehavior.InvalidData:
      return
  }
}
