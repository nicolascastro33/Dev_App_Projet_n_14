export enum BehaviorType {
  InvalidData = 'INVALID_DATA',
  ArrowRight = 'ARROW_RIGHT',
  ArrowLeft = 'ARROW_LEFT',
  ArrowUp = 'ARROW_UP',
  ArrowDown = 'ARROW_DOWN',
  Tab = 'TAB',
  TabShift = 'TAB_SHIFT',
  Escape = 'ESCAPE',
  IncreaseValue = 'INVREASE_VALUE',
  DecreaseValue = 'DECREASE_VALUE',
  SetMinimumValue = 'SET_MINIMUM_VALUE',
  SetMaximumValue = 'SET_MAXIMUM_VALUE',
  TabAndCloseElement = 'TAB_AND_CLOSE_ELEMENT',
  TabShiftAndCloseElement = 'TAB_SHIFT_AND_CLOSE_ELEMENT',
  ArrowUpWhenNoData = 'ARROW_UP_WHEN_NO_DATA',
  ArrowDownWhenNoData = 'ARROW_DOWN_WHEN_NO_DATA',
  AddValidDataWhenNoData = 'ADD_VALID_DATA_WHEN_NO_DATA',
  AddValidDataWhenNoDataThenFocusNextElement = 'ADD_VALID_DATA_WHEN_NO_DATA_THEN_FOCUS_NEXT_ELEMENT',
  AddValidDataWhenData = 'ADD_VALID_DATA_WHEN_DATA',
  AddValidDataWhenDataThenFocusNextElement = 'ADD_VALID_DATA_WHEN_DATA_THEN_FOCUS_NEXT_ELEMENT',
  Enter = 'ENTER',
  OpenOrCloseDatePicker = 'OPEN_OR_CLOSE_DATE_PICKER',
  Delete = 'DELETE',
}

type TGlobalBehavior = { type: Exclude<BehaviorType, BehaviorType.AddValidDataWhenData | BehaviorType.AddValidDataWhenDataThenFocusNextElement> }
type TBehaviorWithValue = {
  type:
    | BehaviorType.AddValidDataWhenDataThenFocusNextElement
    | BehaviorType.AddValidDataWhenData
  value: number
}
type Behavior = TGlobalBehavior | TBehaviorWithValue

type KeyPressBehaviorType = {
  shiftKey?: boolean
  keyPress: string
  nextElement?: boolean
  prevElement?: boolean
  parentElement?: boolean
  isButtonFocus?: boolean
  isItAnInputKeyPress?: boolean
  dataValue?: number
  maxValue?: number
}


export const KeyPressBehavior = ({
  shiftKey,
  keyPress,
  nextElement,
  prevElement,
  isButtonFocus,
  dataValue,
  maxValue,
}: KeyPressBehaviorType): Behavior => {

  if (Number.isNaN(Number(keyPress)) && keyPress.length === 1) {
    return { type: BehaviorType.InvalidData }
  }

  if (keyPress === 'Tab') {
    if (shiftKey) {
      return { type: BehaviorType.TabShift }
    }
    return { type: BehaviorType.Tab }
  }

  if (keyPress === 'ArrowRight') {
    return nextElement
      ? { type: BehaviorType.ArrowRight }
      : { type: BehaviorType.InvalidData }
  }
  if (keyPress === 'ArrowLeft') {
    return prevElement
      ? { type: BehaviorType.ArrowLeft }
      : { type: BehaviorType.InvalidData }
  }
  if (keyPress === 'Enter') {
    if (isButtonFocus) {
      return { type: BehaviorType.OpenOrCloseDatePicker }
    }
    return { type: BehaviorType.Enter }
  }
  if (dataValue) {
    if (keyPress === 'ArrowUp') {
      return { type: BehaviorType.ArrowUp }
    }
    if (keyPress === 'ArrowDown') {
      return { type: BehaviorType.ArrowDown }
    }
    if (keyPress === 'Backspace') {
      return { type: BehaviorType.Delete }
    }
    if (!Number.isNaN(Number(keyPress))) {
      const result = dataValue * 10 + Number(keyPress)
      const value = maxValue && result <= maxValue ? result : Number(keyPress)
      if (maxValue && result > maxValue && Number(keyPress) === 0) {
        return { type: BehaviorType.InvalidData }
      }
      if (maxValue && value * 10 > maxValue && nextElement) {
        return {
          type: BehaviorType.AddValidDataWhenDataThenFocusNextElement,
          value,
        }
      }
      return { type: BehaviorType.AddValidDataWhenData, value }
    }
  } else {
    if (keyPress === 'ArrowUp') {
      return { type: BehaviorType.ArrowUpWhenNoData }
    }
    if (keyPress === 'ArrowDown') {
      return { type: BehaviorType.ArrowDownWhenNoData }
    }
    if (keyPress === 'Backspace') {
      return { type: BehaviorType.InvalidData }
    }
    if (!Number.isNaN(Number(keyPress))) {
      if (maxValue && Number(keyPress) * 10 > maxValue && nextElement) {
        return { type: BehaviorType.AddValidDataWhenNoDataThenFocusNextElement }
      }
      return { type: BehaviorType.AddValidDataWhenNoData }
    }
  }
  return { type: BehaviorType.InvalidData }
}
