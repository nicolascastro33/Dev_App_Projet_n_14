import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { isSelectedDateValid, numberOfZeroYearData } from '../utils'
import { BehaviorType, InputDateBehavior } from './input-date-behavior'

type TDate = {
  day: { name: string; maxValue: number; minValue: number }
  month: {
    name: string
    maxValue: number
    minValue: number
  }
  year: {
    name: string
    maxValue: number
    minValue: number
  }
}

export type TSelectedDate = {
  day: number | undefined
  month: number | undefined
  year: number | undefined
}

type TInputDateProps = {
  validDate: undefined | Date
  setValidDate: Dispatch<SetStateAction<undefined | Date>>
  openOrCloseDatePicker: any
  maxDate: Date | undefined
  minDate: Date | undefined
}

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

  const settingOnKeyDown = (e: any) => {
    e.preventDefault()
    const keyPress = e.key
    const dataType = e.target.getAttribute('data-type') as string
    const dataValue = selectedDate[dataType as keyof typeof selectedDate]
    const minValue = date[dataType as keyof typeof selectedDate].minValue
    const maxValue = date[dataType as keyof typeof selectedDate].maxValue

    const inputDateBehavior = InputDateBehavior({
      keyPress,
      nextElement: e.target.nextElementSibling ? true : false,
      prevElement: e.target.previousElementSibling ? true : false,
      dataValue,
      maxValue,
    })


    const changeDate = ({ value }: { value: number }) => {
      setSelectedDate({
        ...selectedDate,
        [dataType]: value === 0 ? undefined : value,
      })
    }

    switch (inputDateBehavior.type) {
      case BehaviorType.ArrowRight:
        e.target.nextElementSibling.focus()
        return
      case BehaviorType.ArrowLeft:
        e.target.previousElementSibling.focus()
        return
      case BehaviorType.Enter:
        e.target.blur()
        return
      case BehaviorType.ArrowUp:
        changeDate({
          value: dataValue === maxValue ? minValue : dataValue! + 1,
        })
        return
      case BehaviorType.ArrowDown:
        changeDate({
          value: dataValue === minValue ? maxValue : dataValue! - 1,
        })
        return
      case BehaviorType.ArrowUpWhenNoData:
        changeDate({ value: minValue ? minValue : 1 })
        return
      case BehaviorType.ArrowDownWhenNoData:
        changeDate({ value: maxValue })
        return
      case BehaviorType.Delete:
        changeDate({ value: 0 })
        return
      case BehaviorType.AddValidDataWhenData:
        changeDate({ value: inputDateBehavior.value })
        return
      case BehaviorType.AddValidDataWhenDataThenFocusNextElement:
        changeDate({ value: inputDateBehavior.value })
        e.target.nextElementSibling.focus()
        return
      case BehaviorType.AddValidDataWhenNoData:
        changeDate({ value: Number(keyPress) })
        return
      case BehaviorType.AddValidDataWhenNoDataThenFocusNextElement:
        changeDate({ value: Number(keyPress) })
        e.target.nextElemetSibling.focus()
        return
      case BehaviorType.InvalidData:
        return
    }
  }

  const isDateInvalid = (
    date: Date | undefined,
    minDate: Date | undefined,
    maxDate: Date | undefined
  ) => {
    if (date) {
      if (date.getTime() < minDate!.getTime()) return 'invalid-date'
      if (date.getTime() > maxDate!.getTime()) return 'invalid-date'
      return 'valid-date'
    } else {
      return ''
    }
  }

  return (
    <div
      className={`input-date-wrapper ${isDateInvalid(
        isValid,
        minDate,
        maxDate
      )} `}
    >
      <p onClick={settingOnClick} onKeyDown={settingOnKeyDown}>
        <span
          id="input-day"
          data-type="day"
          className="input-date"
          tabIndex={0}
        >
          {selectedDate.day && selectedDate.day < 10 && 0}
          {selectedDate.day ? selectedDate.day : date.day.name}
        </span>
        /
        <span
          id="input-month"
          data-type="month"
          className="input-date"
          tabIndex={0}
        >
          {selectedDate.month && selectedDate.month < 10 && 0}
          {selectedDate.month ? selectedDate.month : date.month.name}
        </span>
        /
        <span
          id="input-year"
          data-type="year"
          className="input-date"
          tabIndex={0}
        >
          {selectedDate.year &&
            selectedDate.year.toString().length < 4 &&
            numberOfZeroYearData(selectedDate.year).map((zero) => zero)}
          {selectedDate.year ? selectedDate.year : date.year.name}
        </span>
      </p>
      <div className="input-date-button" onClick={openOrCloseDatePicker}>
        <FontAwesomeIcon className="input-date-calendar" icon={faCalendar} />
      </div>
    </div>
  )
}
