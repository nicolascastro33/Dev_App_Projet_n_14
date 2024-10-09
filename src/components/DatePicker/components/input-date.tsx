import { TInputDateProps } from '../types/input-date.types'
import { InputDateKeyPress } from '../keypress/keypress-controller/input-date.keypress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { inputDateWrapperCssSelector, numberOfZeroYearData } from '../utils'
import { useContext } from 'react'
import { TUseDatePicker } from '../date-picker.hook'
import { DatePickerContext } from '../Provider'
import { GlobalDate } from '../data'

export const InputDate = ({ maxDate, minDate }: TInputDateProps) => {
  const date = GlobalDate({ maxDate, minDate })

  const {
    inputDate,
    setInputDate,
    toggleOpen: openOrCloseDatePicker,
    buttonToggleId: buttonId,
    isValid,
  } = useContext<TUseDatePicker>(DatePickerContext)

  const settingOnClick = (e: any) => {
    e.preventDefault()
    if (e.target.id) {
      e.target.focus()
    } else {
      e.target.closest('p').firstChild.focus()
    }
  }

  return (
    <div
      className={`input-date-wrapper ${inputDateWrapperCssSelector(
        isValid,
        minDate,
        maxDate
      )} `}
      onKeyDown={(e: any) =>
        InputDateKeyPress({
          e,
          selectedDate: inputDate,
          date,
          setSelectedDate: setInputDate,
          openOrCloseDatePicker,
        })
      }
    >
      <p onClick={settingOnClick}>
        <span
          id="input-day"
          data-type="day"
          className="input-date"
          tabIndex={0}
        >
          {inputDate.day && inputDate.day < 10 && 0}
          {inputDate.day ? inputDate.day : date.day.name}
        </span>
        /
        <span
          id="input-month"
          data-type="month"
          className="input-date"
          tabIndex={0}
        >
          {inputDate.month && inputDate.month < 10 && 0}
          {inputDate.month ? inputDate.month : date.month.name}
        </span>
        /
        <span
          id="input-year"
          data-type="year"
          className="input-date"
          tabIndex={0}
        >
          {inputDate.year &&
            inputDate.year.toString().length < 4 &&
            numberOfZeroYearData(inputDate.year).map((zero) => zero)}
          {inputDate.year ? inputDate.year : date.year.name}
        </span>
      </p>
      <div
        className="input-date-button"
        id={buttonId}
        onClick={openOrCloseDatePicker}
        tabIndex={0}
      >
        <FontAwesomeIcon className="input-date-calendar" icon={faCalendar} />
      </div>
    </div>
  )
}
