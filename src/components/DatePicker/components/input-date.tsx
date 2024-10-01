import { TInputDateProps } from '../types/input-date.types'
import { InputDateKeyPress } from '../keypress/keypress-controller/input-date.keypress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { inputDateWrapperCssSelector, numberOfZeroYearData } from '../utils'
import { useInputDate } from '../hooks/input-date.hook'

export const InputDate = ({
  validDate,
  setValidDate,
  openOrCloseDatePicker,
  maxDate,
  minDate,
}: TInputDateProps) => {
  const { date, selectedDate, setSelectedDate, buttonId, isValid } =
    useInputDate({
      validDate,
      setValidDate,
      maxYear: maxDate?.getFullYear(),
      minYear: minDate?.getFullYear(),
    })

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
          selectedDate,
          date,
          setSelectedDate,
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
