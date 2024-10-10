import { InputDateKeyPressBehavior } from '../keypress-behavior/input-date-keypress'
import { InputDateBehavior } from '../../types/keypress-behavior-types'
import { TInputDateKeyPressProps } from '../../types/date-picker.types'

export const InputDateKeyPress = ({
  e,
  selectedDate,
  date,
  openOrCloseDatePicker,
  setSelectedDate,
}: TInputDateKeyPressProps) => {
  e.preventDefault()
  const keyPress = e.key
  const target = e.target as HTMLTextAreaElement
  const dataType = target.getAttribute('data-type') as string
  const dataValue = selectedDate[dataType as keyof typeof selectedDate]
  const minValue = date[dataType as keyof typeof selectedDate]?.minValue
  const maxValue = date[dataType as keyof typeof selectedDate]?.maxValue
  const allfocusableTabindexElements = document.querySelectorAll(
    '[tabindex], input:not(.hidden-input), button:not(:disabled)'
  )
  const focusable = [...allfocusableTabindexElements] as HTMLElement[]
  const index = focusable.indexOf(target)

  const keyPressBehavior = InputDateKeyPressBehavior({
    shiftKey: e.shiftKey,
    keyPress,
    nextElement: focusable[index + 1],
    prevElement: focusable[index - 1],
    isButtonFocus: target.className === 'input-date-button',
    dataValue,
    maxValue,
  })

  const changeDate = ({ value }: { value: number }) => {
    setSelectedDate({
      ...selectedDate,
      [dataType]: value === 0 ? undefined : value,
    })
  }

  switch (keyPressBehavior.type) {
    case InputDateBehavior.FocusNextElement:
      focusable[index + 1].focus()
      return
    case InputDateBehavior.FocusPreviousElement:
      focusable[index - 1].focus()
      return
    case InputDateBehavior.OpenOrCloseDatePicker:
      openOrCloseDatePicker(e)
      return
    case InputDateBehavior.IncreaseValue:
      changeDate({
        value: dataValue === maxValue ? minValue : dataValue! + 1,
      })
      return
    case InputDateBehavior.DecreaseValue:
      changeDate({
        value: dataValue === minValue ? maxValue : dataValue! - 1,
      })
      return
    case InputDateBehavior.SetMinimumValue:
      changeDate({ value: minValue ? minValue : 1 })
      return
    case InputDateBehavior.SetMaximumValue:
      changeDate({ value: maxValue })
      return
    case InputDateBehavior.DeleteValue:
      changeDate({ value: 0 })
      return
    case InputDateBehavior.AddValidDataWhenData:
      changeDate({ value: keyPressBehavior.value })
      return
    case InputDateBehavior.AddValidDataWhenDataThenFocusNextElement:
      changeDate({ value: keyPressBehavior.value })
      focusable[index + 1].focus()
      return
    case InputDateBehavior.AddValidDataWhenNoData:
      changeDate({ value: Number(keyPress) })
      return
    case InputDateBehavior.AddValidDataWhenNoDataThenFocusNextElement:
      changeDate({ value: Number(keyPress) })
      focusable[index + 1].focus()
      return
    case InputDateBehavior.InvalidData:
      return
  }
}
