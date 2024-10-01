import { isNewElementInParentElement } from '../utils'

export const SelectMenuKeyPressEnum = {
  InvalidData: 'INVALID_DATA',
  SelectOption: 'SELECT_OPTION',
  CloseSelectMenu: 'CLOSE_SELECT_MENU',
  OpenOrCloseSelectMenu: 'OPEN_OR_CLOSE_SELECT_MENU',
  FocusNextElement: 'FOCUS_NEXT_ELEMENT',
  FocusPreviousElement: 'FOCUS_PREVIOUS_ELEMENT',
  FocusNextElementAndCloseSelectMenu:
    'FOCUS_NEXT_ELEMENT_AND_CLOSE_SELECT_MENU',
  FocusPreviousElementAndCloseSelectMenu:
    'FOCUS_PREVIOUS_ELEMENT_AND_CLOSE_SELECT_MENU',
} as const

type TSelectMonthKeyPressBehavior = {
  type: (typeof SelectMenuKeyPressEnum)[keyof typeof SelectMenuKeyPressEnum]
}

type TSelectMonthKeyPressProps = {
  eventTarget: HTMLElement
  keyPress: string
  shiftKey: boolean
  nextElement: HTMLElement | undefined
  prevElement: HTMLElement | undefined
  activeMenu: boolean
}

export const SelectMenuKeyPressBehavior = ({
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
    return { type: SelectMenuKeyPressEnum.InvalidData }
  }
  const isNextElementInSelectMenu = isNewElementInParentElement({
    newElement: nextElement,
    parentElementClassName: 'selectMenu',
  })

  const isPrevElementInSelectMenu = isNewElementInParentElement({
    newElement: prevElement,
    parentElementClassName: 'selectMenu',
  })

  if (eventTarget.className === 'selectMenuHeader' && keyPress === 'Enter') {
    return { type: SelectMenuKeyPressEnum.OpenOrCloseSelectMenu }
  }

  if (keyPress === 'ArrowUp' || (keyPress === 'Tab' && shiftKey)) {
    if (!isPrevElementInSelectMenu && activeMenu) {
      return {
        type: SelectMenuKeyPressEnum.FocusPreviousElementAndCloseSelectMenu,
      }
    }
    return { type: SelectMenuKeyPressEnum.FocusPreviousElement }
  }

  if (keyPress === 'ArrowDown' || (keyPress === 'Tab' && !shiftKey)) {
    if (!isNextElementInSelectMenu && activeMenu) {
      return {
        type: SelectMenuKeyPressEnum.FocusNextElementAndCloseSelectMenu,
      }
    }
    return { type: SelectMenuKeyPressEnum.FocusNextElement }
  }

  if (keyPress === 'Enter' && eventTarget.className === 'option') {
    return { type: SelectMenuKeyPressEnum.SelectOption }
  }

  if (
    keyPress === 'Escape' &&
    eventTarget.className !== 'selectMenuHeader' &&
    activeMenu
  ) {
    return { type: SelectMenuKeyPressEnum.CloseSelectMenu }
  }
  return { type: SelectMenuKeyPressEnum.InvalidData }
}
