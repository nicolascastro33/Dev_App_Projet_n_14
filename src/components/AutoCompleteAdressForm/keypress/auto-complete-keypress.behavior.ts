import { isNewElementInParentElement } from '../utils'

export const AutoCompleteKeyPressEnum = {
  InvalidData: 'INVALID_DATA',
  SelectAddress: 'SELECT_ADDRESS',
  ClearLocations: 'CLOSE_AUTO_COMPLETE',
  FocusNextElement: 'FOCUS_NEXT_ELEMENT',
  FocusPreviousElement: 'FOCUS_PREVIOUS_ELEMENT',
  FocusNextElementAndClearLocations:
    'FOCUS_NEXT_ELEMENT_AND_CLEAR_LOCATIONS',
  FocusPreviousElementAndClearLocations:
    'FOCUS_PREVIOUS_ELEMENT_AND_CLEAR_LOCATIONS',
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
}

export const AutoCompleteKeyPressBehavior = ({
  eventTarget,
  keyPress,
  shiftKey,
  nextElement,
  prevElement,
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
    parentElementClassName: 'autocomplete-locations',
  })

  const isPrevElementInAutoComplete = isNewElementInParentElement({
    newElement: prevElement,
    parentElementClassName: 'autocomplete-locations',
  })

  if (eventTarget.id.includes('location') && keyPress === 'Enter') {
    return { type: AutoCompleteKeyPressEnum.SelectAddress }
  }

  if (keyPress === 'ArrowUp' || (keyPress === 'Tab' && shiftKey)) {
    if (!isPrevElementInAutoComplete) {
      return {
        type: AutoCompleteKeyPressEnum.FocusPreviousElementAndClearLocations,
      }
    }
    return { type: AutoCompleteKeyPressEnum.FocusPreviousElement }
  }

  if (keyPress === 'ArrowDown' || (keyPress === 'Tab' && !shiftKey)) {
    if (!isNextElementInAutoComplete) {
      return {
        type: AutoCompleteKeyPressEnum.FocusNextElementAndClearLocations,
      }
    }
    return { type: AutoCompleteKeyPressEnum.FocusNextElement }
  }

  if (keyPress === 'Escape') {
    return { type: AutoCompleteKeyPressEnum.ClearLocations }
  }
  return { type: AutoCompleteKeyPressEnum.InvalidData }
}
