import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { TDate, TSelectedDate } from './input-date.types'
import { inputDateWrapperCssSelector, numberOfZeroYearData } from '../../utils'

export type TInputDateLayout = {
  settingOnKeyDown: (e: any) => void
  settingOnClick: (e: any) => void
  selectedDate: TSelectedDate
  date: TDate
  buttonId: string
  openOrCloseDatePicker: () => void
  minDate: Date | undefined
  maxDate: Date | undefined
  isValid: Date | undefined
}

export const InputDateLayout = ({
  settingOnKeyDown,
  settingOnClick,
  selectedDate,
  date,
  buttonId,
  openOrCloseDatePicker,
  minDate,
  maxDate,
  isValid,
}: TInputDateLayout) => {
  return (
    <div
      className={`input-date-wrapper ${inputDateWrapperCssSelector(
        isValid,
        minDate,
        maxDate
      )} `}
      onKeyDown={settingOnKeyDown}
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
