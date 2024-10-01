import {
  SelectMenuKeyPressBehavior,
  SelectMenuKeyPressEnum,
} from './select-menu-keypress.behavior'

type TSelectMenuKeyPress = {
  e: any
  openOrCloseSelectMenu: () => void
  activeMenu: boolean
  closeSelectMenu: () => void
  selectOption: (option: string) => void
}

export const SelectMenuKeyPress = ({
  e,
  openOrCloseSelectMenu,
  activeMenu,
  closeSelectMenu,
  selectOption,
}: TSelectMenuKeyPress) => {
  const allFocusableElements = document.querySelectorAll(
    '[tabindex], input:not(.hidden-input), button:not(:disabled)'
  )
  const focusable = [...allFocusableElements] as HTMLElement[]
  const index = focusable.indexOf(e.target)
  const nextElement = focusable[index + 1]
  const prevElement = focusable[index - 1]

  const keyPressBehavior = SelectMenuKeyPressBehavior({
    activeMenu,
    eventTarget: e.target,
    shiftKey: e.shiftKey,
    keyPress: e.key,
    nextElement,
    prevElement,
  })


  const parentElement = e.target.closest('.selectMenu')
  const focusableParent = parentElement!.querySelectorAll(
    '[tabindex], input:not(.hidden-input), button:not(:disabled)'
  )
  const allFocusElementsInParentElement = [...focusableParent] as HTMLElement[]
  const length = allFocusElementsInParentElement.length - 1
  const firstElementAfterParentElementIndex =
    focusable.indexOf(allFocusElementsInParentElement[length]) + 1

  switch (keyPressBehavior.type) {
    case SelectMenuKeyPressEnum.CloseSelectMenu:
      e.preventDefault()
      focusable[firstElementAfterParentElementIndex].focus()
      closeSelectMenu()
      return
    case SelectMenuKeyPressEnum.OpenOrCloseSelectMenu:
      e.preventDefault()
      openOrCloseSelectMenu()
      return
    case SelectMenuKeyPressEnum.InvalidData:
      return
    case SelectMenuKeyPressEnum.SelectOption:
      e.preventDefault()
      const option = e.target.getAttribute('data-option')
      focusable[firstElementAfterParentElementIndex].focus()
      selectOption(option)
      return
    case SelectMenuKeyPressEnum.FocusNextElement:
      e.preventDefault()
      nextElement.focus()
      return
    case SelectMenuKeyPressEnum.FocusPreviousElement:
      e.preventDefault()
      prevElement.focus()
      return
    case SelectMenuKeyPressEnum.FocusNextElementAndCloseSelectMenu:
      e.preventDefault()
      nextElement.focus()
      closeSelectMenu()
      return
    case SelectMenuKeyPressEnum.FocusPreviousElementAndCloseSelectMenu:
      e.preventDefault()
      prevElement.focus()
      closeSelectMenu()
      return
  }
}
