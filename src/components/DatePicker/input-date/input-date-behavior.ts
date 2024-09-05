export enum BehaviorType {
  InvalidData = 'INVALID_DATA',
  ArrowRight = 'ARROW_RIGHT',
  ArrowLeft = 'ARROW_LEFT',
  ArrowUpWhenNoData = 'ARROW_UP_WHEN_NO_DATA',
  ArrowDownWhenNoData = 'ARROW_DOWN_WHEN_NO_DATA',
  AddValidDataWhenNoData = 'ADD_VALID_DATA_WHEN_NO_DATA',
  AddValidDataWhenNoDataThenFocusNextElement = 'ADD_VALID_DATA_WHEN_NO_DATA_THEN_FOCUS_NEXT_ELEMENT',
  AddValidDataWhenData = 'ADD_VALID_DATA_WHEN_DATA',
  AddValidDataWhenDataThenFocusNextElement = 'ADD_VALID_DATA_WHEN_DATA_THEN_FOCUS_NEXT_ELEMENT',
  ArrowUp = 'ARROW_UP',
  ArrowDown = 'ARROW_DOWN',
  Enter = 'ENTER',
  Delete = 'DELETE',
}

export type Behavior =
  | {
      type: BehaviorType.ArrowLeft
    }
  | { type: BehaviorType.ArrowRight }
  | {
      type: BehaviorType.ArrowUp
    }
  | {
      type: BehaviorType.ArrowDown
    }
  | {
      type: BehaviorType.ArrowUpWhenNoData
    }
  | {
      type: BehaviorType.ArrowDownWhenNoData
    }
  | {
      type: BehaviorType.AddValidDataWhenData
      value: number
    }
  | {
      type: BehaviorType.AddValidDataWhenNoData
    }
  | {
      type: BehaviorType.AddValidDataWhenDataThenFocusNextElement
      value: number
    }
  | {
      type: BehaviorType.AddValidDataWhenNoDataThenFocusNextElement
    }
  | {
      type: BehaviorType.Delete
    }
  | { type: BehaviorType.Enter }
  | {
      type: BehaviorType.InvalidData
    }

type InputDateBehaviorType = {
  keyPress: string
  nextElement?: boolean
  prevElement?: boolean
  dataValue: number | undefined
  maxValue?: number | undefined
}

export const InputDateBehavior = ({
  keyPress,
  nextElement,
  prevElement,
  dataValue,
  maxValue,
}: InputDateBehaviorType): Behavior => {
  if (Number.isNaN(Number(keyPress)) && keyPress.length === 1) {
    return { type: BehaviorType.InvalidData }
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
    if (maxValue && Number(keyPress) * 10 > maxValue && nextElement) {
      return { type: BehaviorType.AddValidDataWhenNoDataThenFocusNextElement }
    }
    return { type: BehaviorType.AddValidDataWhenNoData }
  }
  return { type: BehaviorType.InvalidData }
}
