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
  OpenOrCloseDatePicker: 'OPEN_OR_CLOSE_DATE_PICKER',
  FocusNextElementAndCloseDatePicker:
    'FOCUS_NEXT_ELEMENT_AND_CLOSE_DATE_PICKER',
  FocusPreviousElementAndCloseDatePicker:
    'FOCUS_PREVIOUS_ELEMENT_AND_CLOSE_DATE_PICKER',
} as const

export const SelectMonthBehavior = {
  ...GlobalBehaviorEnum,
  OpenOrCloseDatePicker: 'OPEN_OR_CLOSE_SELECT_MONTH',
  FocusNextElementAndCloseSelectMonth:
    'FOCUS_NEXT_ELEMENT_AND_CLOSE_SELECT_MONTH',
  FocusPreviousElementAndCloseSelectMonth:
    'FOCUS_PREVIOUS_ELEMENT_AND_CLOSE_SELECT_MONTH',
} as const

export const InputDateBehavior = {
  ...GlobalBehaviorEnum,
  OpenOrCloseDatePicker: 'OPEN_OR_CLOSE_DATE_PICKER',
  AddValidDataWhenNoData: 'ADD_VALID_DATA_WHEN_NO_DATA',
  AddValidDataWhenNoDataThenFocusNextElement:
    'ADD_VALID_DATA_WHEN_NO_DATA_THEN_FOCUS_NEXT_ELEMENT',
  AddValidDataWhenData: 'ADD_VALID_DATA_WHEN_DATA',
  AddValidDataWhenDataThenFocusNextElement:
    'ADD_VALID_DATA_WHEN_DATA_THEN_FOCUS_NEXT_ELEMENT',
  IncreaseValue: 'INVREASE_VALUE',
  DecreaseValue: 'DECREASE_VALUE',
  SetMinimumValue: 'SET_MINIMUM_VALUE',
  SetMaximumValue: 'SET_MAXIMUM_VALUE',
  DeleteValue: 'DELETE_VALUE',
  Enter: 'ENTER',
} as const

export type TDatePickerBehavior = {
  type: (typeof DatePickerBehavior)[keyof typeof DatePickerBehavior]
}
export type TSelectMonthBehavior = {
  type: (typeof SelectMonthBehavior)[keyof typeof SelectMonthBehavior]
}
export type TInputDateBehavior =
  | { type: (typeof InputDateBehavior)[keyof typeof InputDateBehavior] }
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
  nextElement?: boolean
  prevElement?: boolean
  parentElement?: boolean
}

export type TDatePickerPropsBehavior = TGlobalPropsBehavior & {}

export type TSelectMonthPropsBehavior = TGlobalPropsBehavior & {}

export type TInputDatePropsBehavior = TGlobalPropsBehavior & {
  isButtonFocus?: boolean
  dataValue?: number
  maxValue?: number
}
