import { isNewElementInParentElement } from '../utils'

export const AutoCompleteKeyPressEnum = {
  InvalidData: 'INVALID_DATA',
  SelectOption: 'SELECT_OPTION',
  CloseAutoComplete: 'CLOSE_SELECT_MENU',
  OpenOrCloseAutoComplete: 'OPEN_OR_CLOSE_SELECT_MENU',
  FocusNextElement: 'FOCUS_NEXT_ELEMENT',
  FocusPreviousElement: 'FOCUS_PREVIOUS_ELEMENT',
  FocusNextElementAndCloseAutoComplete:
    'FOCUS_NEXT_ELEMENT_AND_CLOSE_SELECT_MENU',
  FocusPreviousElementAndCloseAutoComplete:
    'FOCUS_PREVIOUS_ELEMENT_AND_CLOSE_SELECT_MENU',
} as const

type TSelectMonthKeyPressBehavior = {
  type: (typeof AutoCompleteKeyPressEnum)[keyof typeof AutoCompleteKeyPressEnum]
}

type TSelectMonthKeyPressProps = {
  eventTarget: HTMLElement
  keyPress: string
  shiftKey: boolean
  nextElement: HTMLElement | undefined
  prevElement: HTMLElement | undefined
  activeMenu: boolean
}

export const AutoCompleteKeyPressBehavior = ({
  eventTarget,
  keyPress,
  shiftKey,
  nextElement,
  prevElement,
  activeMenu,
}: TSelectMonthKeyPressProps): TSelectMonthKeyPressBehavior => {
  if (
    (eventTarget as HTMLInputElement).type === 'search' &&
    keyPress !== 'Tab' &&
    keyPress !== 'ArrowUp' &&
    keyPress !== 'ArrowDown' &&
    keyPress !== 'Enter' &&
    keyPress !== 'Escape'
  ) {
    return { type: AutoCompleteKeyPressEnum.InvalidData }
  }
  const isNextElementInAutoComplete = isNewElementInParentElement({
    newElement: nextElement,
    parentElementClassName: 'AutoComplete',
  })

  const isPrevElementInAutoComplete = isNewElementInParentElement({
    newElement: prevElement,
    parentElementClassName: 'AutoComplete',
  })

  if (eventTarget.className === 'AutoCompleteHeader' && keyPress === 'Enter') {
    return { type: AutoCompleteKeyPressEnum.OpenOrCloseAutoComplete }
  }

  if (keyPress === 'ArrowUp' || (keyPress === 'Tab' && shiftKey)) {
    if (!isPrevElementInAutoComplete && activeMenu) {
      return {
        type: AutoCompleteKeyPressEnum.FocusPreviousElementAndCloseAutoComplete,
      }
    }
    return { type: AutoCompleteKeyPressEnum.FocusPreviousElement }
  }

  if (keyPress === 'ArrowDown' || (keyPress === 'Tab' && !shiftKey)) {
    if (!isNextElementInAutoComplete && activeMenu) {
      return {
        type: AutoCompleteKeyPressEnum.FocusNextElementAndCloseAutoComplete,
      }
    }
    return { type: AutoCompleteKeyPressEnum.FocusNextElement }
  }

  if (keyPress === 'Enter' && eventTarget.className === 'option') {
    return { type: AutoCompleteKeyPressEnum.SelectOption }
  }

  if (
    keyPress === 'Escape' &&
    eventTarget.className !== 'AutoCompleteHeader' &&
    activeMenu
  ) {
    return { type: AutoCompleteKeyPressEnum.CloseAutoComplete }
  }
  return { type: AutoCompleteKeyPressEnum.InvalidData }
}
