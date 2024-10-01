import { SelectMonthBehavior } from '../keypress-behavior/keypress-behavior-types'
import { SelectMonthKeyPressBehavior } from '../keypress-behavior/select-month-keypress'
import { TSelectMonthKeyDownProps } from '../../types/select-month.types'

export const SelectMonthKeyDown = ({
  e,
  showSelectMonth,
  setShowSelectMonth,
  yearOpen,
  clickOnYear,
  selectAMonth,
}: TSelectMonthKeyDownProps) => {
  const keyPress = e.key
  if (!showSelectMonth) return
  e.preventDefault()
  if (keyPress === 'Escape') {
    setShowSelectMonth(false)
    return
  }

  const parentElement = e.target.closest('.select-month-wrapper')
  const allFocusableParentElements = parentElement!.querySelectorAll(
    '[tabindex], input:not(.hidden-input), button:not(:disabled)'
  )
  const focusable = [...allFocusableParentElements] as HTMLElement[]
  const index = focusable.indexOf(e.target)

  const keyPressBehavior = SelectMonthKeyPressBehavior({
    eventTarget: e.target,
    shiftKey: e.shiftKey,
    keyPress,
    nextElement: focusable[index + 1],
    prevElement: focusable[index - 1],
    allFocusableElements: focusable,
  })

  switch (keyPressBehavior.type) {
    case SelectMonthBehavior.CloseSelectMonth:
      setShowSelectMonth(false)
      return
    case SelectMonthBehavior.ClickOnYear:
      clickOnYear(Number(e.target.getAttribute('data-year')))
      return
    case SelectMonthBehavior.SetMonth:
      const indexMonth = e.target.getAttribute('data-month')
      const year = e.target.getAttribute('data-year')
      selectAMonth(indexMonth, year)
      return
    case SelectMonthBehavior.FocusNextElement:
      focusable[index + 1].focus()
      return
    case SelectMonthBehavior.FocusNextElementAndCloseSelectMonth:
      focusable[index + 1].focus()
      setShowSelectMonth(false)
      return
    case SelectMonthBehavior.FocusPreviousElement:
      focusable[index - 1].focus()
      return
    case SelectMonthBehavior.FocusPreviousElementAndCloseSelectMonth:
      focusable[index - 1].focus()
      setShowSelectMonth(false)
      return
    case SelectMonthBehavior.FocusOnNextYearButton:
      e.target
        .closest(`.select-month`)
        .querySelector(`#select-${yearOpen - 1}-header`)
        .focus()
      return
    case SelectMonthBehavior.FocusOnPreviousYearButton:
      e.target
        .closest(`#select-year-${yearOpen}`)
        .querySelector('.select-year-header')
        .focus()
      return
    case SelectMonthBehavior.ArrowDown:
      focusable[index + 4].focus()
      return
    case SelectMonthBehavior.ArrowUp:
      focusable[index - 4].focus()
      return
    case SelectMonthBehavior.InvalidData:
      return
  }
}
