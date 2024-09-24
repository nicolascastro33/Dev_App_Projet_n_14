import { useEffect, useId, useMemo, useState } from 'react'
import { isSelectedDateValid } from '../../utils'
import { TDate, TInputDateProps, TSelectedDate } from './input-date.types'
import { InputDateLayout } from './input-date.layout'
import { InputDateKeyDown } from './input-date.keydown'

export const InputDate = ({
  validDate,
  setValidDate,
  openOrCloseDatePicker,
  maxDate,
  minDate,
}: TInputDateProps) => {
  const date: TDate = {
    day: {
      name: 'jj',
      maxValue: 31,
      minValue: 1,
    },
    month: {
      name: 'mm',
      maxValue: 12,
      minValue: 1,
    },
    year: {
      name: 'aaaa',
      minValue: minDate ? minDate.getFullYear() : new Date().getFullYear() - 50,
      maxValue: maxDate ? maxDate.getFullYear() : new Date().getFullYear() + 50,
    },
  }
  const buttonId = useId()
  const [selectedDate, setSelectedDate] = useState<TSelectedDate>({
    day: validDate ? validDate.getDate() : undefined,
    month: validDate ? validDate.getMonth() : undefined,
    year: validDate ? validDate.getFullYear() : undefined,
  })
  const isValid = useMemo<undefined | Date>(
    () => isSelectedDateValid(selectedDate),
    [selectedDate]
  )

  useEffect(() => {
    setValidDate(isValid)
  }, [isValid])

  useEffect(() => {
    if (validDate === isValid) return
    if (validDate) {
      setSelectedDate({
        day: validDate.getDate(),
        month: validDate.getMonth() + 1,
        year: validDate.getFullYear(),
      })
    } else {
      setSelectedDate({
        day: undefined,
        month: undefined,
        year: undefined,
      })
    }
  }, [validDate])

  const settingOnClick = (e: any) => {
    e.preventDefault()
    if (e.target.id) {
      e.target.focus()
    } else {
      e.target.closest('p').firstChild.focus()
    }
  }

  return (
    <InputDateLayout
      settingOnClick={settingOnClick}
      settingOnKeyDown={(e: any) =>
        InputDateKeyDown({
          e,
          selectedDate,
          date,
          setSelectedDate,
          openOrCloseDatePicker,
        })
      }
      selectedDate={selectedDate}
      date={date}
      buttonId={buttonId}
      openOrCloseDatePicker={openOrCloseDatePicker}
      minDate={minDate}
      maxDate={maxDate}
      isValid={isValid}
    />
  )
}
