// Types Promises behavior

const GlobalBehaviorEnum = {
  InvalidData: 'INVALID_DATA',
  ArrowUp: 'ARROW_UP',
  ArrowDown: 'ARROW_DOWN',
  Escape: 'ESCAPE',
  FocusNextElement: 'FOCUS_NEXT_ELEMENT',
  FocusPreviousElement: 'FOCUS_PREVIOUS_ELEMENT',
} as const

export const DatePickerBehavior = {
  ...GlobalBehaviorEnum,
  CloseDatePicker: 'CLOSE_DATE_PICKER',
  FocusFirstDayOfTheCalendar: 'FOCUS_FIRST_DAY_OF_THE_CALENDAR',
  FocusLastDayOfTheCalendar: 'FOCUS_LAST_DAY_OF_THE_CALENDAR',
  FocusNextElementAndCloseDatePicker:
    'FOCUS_NEXT_ELEMENT_AND_CLOSE_DATE_PICKER',
  FocusPreviousElementAndCloseDatePicker:
    'FOCUS_PREVIOUS_ELEMENT_AND_CLOSE_DATE_PICKER',
  SetShowSelectMonth: 'SET_SHOW_SELECT_MONTH',
  HandleSelectionDate: 'HANDLE_SELECTION_DATE',
  SetPreviousMonth: 'SET_PREVIOUS_MONTH',
  SetNextMonth: 'SET_NEXT_MONTH',
  SetTodayDate: 'SET_TODAY_DATE',
  EraseDate: 'ERASE_DATE',
} as const

export const SelectMonthBehavior = {
  ...GlobalBehaviorEnum,
  CloseSelectMonth: 'CLOSE_SELECT_MONTH',
  ClickOnYear: 'CLICK_ON_YEAR',
  SetMonth: 'SET_MONTH',
  FocusNextElementAndCloseSelectMonth:
    'FOCUS_NEXT_ELEMENT_AND_CLOSE_SELECT_MONTH',
  FocusPreviousElementAndCloseSelectMonth:
    'FOCUS_PREVIOUS_ELEMENT_AND_CLOSE_SELECT_MONTH',
  FocusOnPreviousYearButton: 'FOCUS_ON_PREVIOUS_YEAR_BUTTON',
  FocusOnNextYearButton: 'FOCUS_ON_NEXT_YEAR_BUTTON',
} as const

export const InputDateBehaviorWithoutValue = {
  ...GlobalBehaviorEnum,
  OpenOrCloseDatePicker: 'OPEN_OR_CLOSE_DATE_PICKER',
  AddValidDataWhenNoData: 'ADD_VALID_DATA_WHEN_NO_DATA',
  AddValidDataWhenNoDataThenFocusNextElement:
    'ADD_VALID_DATA_WHEN_NO_DATA_THEN_FOCUS_NEXT_ELEMENT',
  IncreaseValue: 'INVREASE_VALUE',
  DecreaseValue: 'DECREASE_VALUE',
  SetMinimumValue: 'SET_MINIMUM_VALUE',
  SetMaximumValue: 'SET_MAXIMUM_VALUE',
  DeleteValue: 'DELETE_VALUE',
} as const

export const InputDateBehavior = {
  ...GlobalBehaviorEnum,
  ...InputDateBehaviorWithoutValue,
  AddValidDataWhenData: 'ADD_VALID_DATA_WHEN_DATA',
  AddValidDataWhenDataThenFocusNextElement:
    'ADD_VALID_DATA_WHEN_DATA_THEN_FOCUS_NEXT_ELEMENT',
} as const

export type TDatePickerBehavior = {
  type: (typeof DatePickerBehavior)[keyof typeof DatePickerBehavior]
}
export type TSelectMonthBehavior = {
  type: (typeof SelectMonthBehavior)[keyof typeof SelectMonthBehavior]
}

export type TInputDateBehavior =
  | {
      type: (typeof InputDateBehaviorWithoutValue)[keyof typeof InputDateBehaviorWithoutValue]
    }
  | {
      type:
        | typeof InputDateBehavior.AddValidDataWhenData
        | typeof InputDateBehavior.AddValidDataWhenDataThenFocusNextElement
      value: number
    }

// Type Props Behavior
type TGlobalPropsBehavior = {
  shiftKey?: boolean
  keyPress: string
  nextElement?: HTMLElement
  prevElement?: HTMLElement
}

export type TDatePickerPropsBehavior = TGlobalPropsBehavior & {
  eventTarget: HTMLElement
}

export type TSelectMonthPropsBehavior = TGlobalPropsBehavior & {
  eventTarget: HTMLElement
  allFocusableElements: HTMLElement[]
}

export type TInputDatePropsBehavior = TGlobalPropsBehavior & {
  isButtonFocus?: boolean
  dataValue?: number
  maxValue?: number
}
