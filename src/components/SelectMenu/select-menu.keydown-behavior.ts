const SelectMenuKeyDownEnum = {
  InvalidData: 'INVALID_DATA',
  CloseSelectMenu: 'CLOSE_SELECT_MENU',
  FocusNextElement: 'FOCUS_NEXT_ELEMENT',
  FocusPreviousElement: 'FOCUS_PREVIOUS_ELEMENT',
  FocusNextElementAndCloseSelectMenu:
    'FOCUS_NEXT_ELEMENT_AND_CLOSE_SELECT_MENU',
  FocusPreviousElementAndCloseSelectMenu:
    'FOCUS_PREVIOUS_ELEMENT_AND_CLOSE_SELECT_MENU',
} as const

type TSelectMonthKeydownBehavior = {
  type: (typeof SelectMenuKeyDownEnum)[keyof typeof SelectMenuKeyDownEnum]
}

type TSelectMonthKeydownProps = {
  e: any
}

export const SelectMonthKeydownBehavior = ({
  e,
}: TSelectMonthKeydownProps): TSelectMonthKeydownBehavior => {
  return { type: SelectMenuKeyDownEnum.InvalidData }
}
