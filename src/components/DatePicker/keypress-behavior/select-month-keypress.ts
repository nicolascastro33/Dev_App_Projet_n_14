import { isNewElementInParentElement } from '../utils'
import {
  SelectMonthBehavior,
  TSelectMonthBehavior,
  TSelectMonthPropsBehavior,
} from './keypress-behavior-types'

export const SelectMonthKeyPressBehavior = ({
  eventTarget,
  shiftKey,
  keyPress,
  nextElement,
  prevElement,
  allFocusableElements,
}: TSelectMonthPropsBehavior): TSelectMonthBehavior => {
  const index = allFocusableElements.indexOf(eventTarget)
  const isPreviousElementInSelectMonth = isNewElementInParentElement({
    newElement: prevElement,
    parentElementClassName: 'select-month-wrapper',
  })

  const isNextElementInSelectMonth = isNewElementInParentElement({
    newElement: nextElement,
    parentElementClassName: 'select-month-wrapper',
  })

  if (keyPress === 'Escape') {
    return { type: SelectMonthBehavior.CloseSelectMonth }
  }
  if (keyPress === 'Enter') {
    if (eventTarget.className === 'select-year-header') {
      return { type: SelectMonthBehavior.ClickOnYear }
    }
    if (eventTarget.className.trim() === 'select-month-button') {
      return { type: SelectMonthBehavior.SetMonth }
    }
    return { type: SelectMonthBehavior.InvalidData }
  }

  if (keyPress === 'ArrowUp') {
    if (prevElement?.className === 'select-year-header') {
      return { type: SelectMonthBehavior.FocusPreviousElement }
    }

    if (!isPreviousElementInSelectMonth) {
      return {
        type: SelectMonthBehavior.FocusPreviousElementAndCloseSelectMonth,
      }
    }

    if (
      !isNewElementInParentElement({
        newElement: allFocusableElements[index - 4],
        parentElementClassName: 'select-month-wrapper',
      }) ||
      allFocusableElements[index - 4].className === 'select-year-header'
    ) {
      return { type: SelectMonthBehavior.FocusOnPreviousYearButton }
    }
    return { type: SelectMonthBehavior.ArrowUp }
  }

  if (keyPress === 'ArrowDown') {
    if (!isNextElementInSelectMonth) {
      return {
        type: SelectMonthBehavior.FocusNextElementAndCloseSelectMonth,
      }
    }

    if (eventTarget?.className === 'select-year-header') {
      return { type: SelectMonthBehavior.FocusNextElement }
    }
    
    if (
      !isNewElementInParentElement({
        newElement: allFocusableElements[index + 4],
        parentElementClassName: 'select-month-wrapper',
      }) ||
      allFocusableElements[index + 4].className === 'select-year-header'
    ) {
      return { type: SelectMonthBehavior.FocusOnNextYearButton }
    }
    return { type: SelectMonthBehavior.ArrowDown }
  }

  if (keyPress === 'ArrowRight') {
    if (eventTarget.className.includes('select-month-button') && nextElement) {
      return { type: SelectMonthBehavior.FocusNextElement }
    }
    return { type: SelectMonthBehavior.InvalidData }
  }

  if (keyPress === 'ArrowLeft') {
    if (eventTarget.className.includes('select-month-button') && prevElement) {
      return { type: SelectMonthBehavior.FocusPreviousElement }
    }
    return { type: SelectMonthBehavior.InvalidData }
  }
  if (keyPress === 'Tab' && shiftKey) {
    if (!prevElement) return { type: SelectMonthBehavior.InvalidData }
    if (isPreviousElementInSelectMonth) {
      return {
        type: SelectMonthBehavior.FocusPreviousElement,
      }
    }
    return {
      type: SelectMonthBehavior.FocusPreviousElementAndCloseSelectMonth,
    }
  }

  if (keyPress === 'Tab' && !shiftKey) {
    if (!nextElement) return { type: SelectMonthBehavior.InvalidData }
    if (isNextElementInSelectMonth) {
      return {
        type: SelectMonthBehavior.FocusNextElement,
      }
    }
    return {
      type: SelectMonthBehavior.FocusNextElementAndCloseSelectMonth,
    }
  }
  return { type: SelectMonthBehavior.InvalidData }
}
