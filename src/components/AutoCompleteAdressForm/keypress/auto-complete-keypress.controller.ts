import {
  AutoCompleteKeyPressBehavior,
  AutoCompleteKeyPressEnum,
} from './auto-complete-keypress.behavior'

type TAutoCompleteKeyPress = {
  e: any
  clearLocations: () => void
  selectAddress: (index: number) => void
}

export const AutoCompleteKeyPress = ({
  e,
  clearLocations,
  selectAddress,
}: TAutoCompleteKeyPress) => {
  const allFocusableElements = document.querySelectorAll(
    '[tabindex], input:not(.hidden-input), button:not(:disabled)'
  )
  const focusable = [...allFocusableElements] as HTMLElement[]
  const index = focusable.indexOf(e.target)
  const nextElement = focusable[index + 1]
  const prevElement = focusable[index - 1]

  const keyPressBehavior = AutoCompleteKeyPressBehavior({
    eventTarget: e.target,
    shiftKey: e.shiftKey,
    keyPress: e.key,
    nextElement,
    prevElement,
  })

  const parentElement = e.target.closest('.autocomplete-locations')
  const focusableParent = parentElement!.querySelectorAll(
    '[tabindex], input:not(.hidden-input), button:not(:disabled)'
  )
  const allFocusElementsInParentElement = [...focusableParent] as HTMLElement[]
  const length = allFocusElementsInParentElement.length - 1
  const firstElementAfterParentElementIndex =
    focusable.indexOf(allFocusElementsInParentElement[length]) + 1

  switch (keyPressBehavior.type) {
    case AutoCompleteKeyPressEnum.ClearLocations:
      e.preventDefault()
      focusable[firstElementAfterParentElementIndex].focus()
      clearLocations()
      return
    case AutoCompleteKeyPressEnum.InvalidData:
      return
    case AutoCompleteKeyPressEnum.SelectAddress:
      e.preventDefault()
      const address = e.target.getAttribute('data-location-index')
      focusable[firstElementAfterParentElementIndex].focus()
      selectAddress(address)
      return
    case AutoCompleteKeyPressEnum.FocusNextElement:
      e.preventDefault()
      nextElement.focus()
      return
    case AutoCompleteKeyPressEnum.FocusPreviousElement:
      e.preventDefault()
      prevElement.focus()
      return
    case AutoCompleteKeyPressEnum.FocusNextElementAndClearLocations:
      e.preventDefault()
      nextElement.focus()
      clearLocations()
      return
    case AutoCompleteKeyPressEnum.FocusPreviousElementAndClearLocations:
      e.preventDefault()
      prevElement.focus()
      clearLocations()
      return
  }
}
