import {
    SelectMonthBehavior,
    TSelectMonthBehavior,
    TSelectMonthPropsBehavior,
  } from './keypress-behavior-types'
  
  export const SelectMonthKeyPressBehavior = ({
    shiftKey,
    keyPress,
    nextElement,
    prevElement,
  }: TSelectMonthPropsBehavior): TSelectMonthBehavior => {
    
    return { type: SelectMonthBehavior.InvalidData }
  }
  