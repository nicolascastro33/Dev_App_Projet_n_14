import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { numberOfZeroYearData } from './utils'

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

type TSelectedDate = {
  day: number | undefined
  month: number | undefined
  year: number | undefined
}

type TInputDateProps = {
  openOrCloseDatePicker: any
  maxYearDate: number | undefined
  minYearDate: number | undefined
}

export const InputDate = ({
  openOrCloseDatePicker,
  maxYearDate,
  minYearDate,
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
      minValue: minYearDate ? minYearDate : new Date().getFullYear() - 50,
      maxValue: maxYearDate ? maxYearDate : new Date().getFullYear() + 50,
    },
  }

  const [selectedDate, setSelectedDate] = useState<TSelectedDate>({
    day: undefined,
    month: undefined,
    year: undefined,
  })

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
    const dataType = e.target.getAttribute('data-type')
    const dataValue = selectedDate[dataType as keyof typeof selectedDate]
    const minValue = date[dataType as keyof typeof selectedDate].minValue
    const maxValue = date[dataType as keyof typeof selectedDate].maxValue

    if (Number.isNaN(Number(keyPress)) && keyPress.length === 1) return

    // if the user want to change the focus of the date
    if (keyPress === 'ArrowRight' && e.target.nextElementSibling) {
      e.target.nextElementSibling.focus()
      return
    }
    if (keyPress === 'ArrowLeft' && e.target.previousElementSibling) {
      e.target.previousElementSibling.focus()
      return
    }
    if (keyPress === 'Enter') {
      e.target.blur()
      return
    }

    // If no date has been set before
    if (!dataValue) {
      if (keyPress === 'ArrowUp') {
        setSelectedDate({
          ...selectedDate,
          [dataType]: minValue ? minValue : 1,
        })
        return
      }
      if (keyPress === 'ArrowDown') {
        setSelectedDate({
          ...selectedDate,
          [dataType]: maxValue,
        })
        return
      }
      if (!Number.isNaN(Number(keyPress)) && Number(keyPress) >= 1) {
        setSelectedDate({
          ...selectedDate,
          [dataType]: Number(keyPress),
        })
        if (Number(keyPress) * 10 > maxValue && e.target.nextElementSibling) {
          e.target.nextElementSibling.focus()
        }
      }
    }
    // if data has been set before
    if (dataValue) {
      if (keyPress === 'ArrowUp') {
        setSelectedDate({
          ...selectedDate,
          [dataType]: dataValue === maxValue ? minValue : dataValue + 1,
        })
        return
      }
      if (keyPress === 'ArrowDown') {
        setSelectedDate({
          ...selectedDate,
          [dataType]: dataValue === minValue ? maxValue : dataValue - 1,
        })
        return
      }
      if (keyPress === 'Backspace') {
        setSelectedDate({
          ...selectedDate,
          [dataType]: undefined,
        })
        return
      }
      if (!Number.isNaN(Number(keyPress))) {
        const result = dataValue * 10 + Number(keyPress)
        const value = result <= maxValue ? result : Number(keyPress)
        if (result > maxValue && Number(keyPress) === 0) return
        setSelectedDate({
          ...selectedDate,
          [dataType]: value,
        })
        if (value * 10 > maxValue && e.target.nextElementSibling) {
          e.target.nextElementSibling.focus()
        }
      }
    }
  }

  return (
    <div className="input-date-wrapper">
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
      <button onClick={openOrCloseDatePicker}>
        <FontAwesomeIcon className="input-date-calendar" icon={faCalendar} />
      </button>
    </div>
  )
}
