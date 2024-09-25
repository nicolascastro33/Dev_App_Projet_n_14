import { LegacyRef } from 'react'
import { SelectMonth } from './components/select-month/select-month.controller'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { monthNames } from './consts'
import {
  getDayWithoutHour,
  getNumberOfDaysInMonth,
  getSortedDays,
  getTimeFromState,
  range,
} from './utils'
import { InputDate } from './components/input-date/input-date.controller'
import './style.css'
import { useOutsideClick } from './utils/use-outside-click'
import { TDatePickerLayout } from './date-picker.types'

export const DatePickerLayout = ({
  handleClickOutside,
  selectedDate,
  setSelectedDate,
  openOrCloseDatePicker,
  maxDate,
  minDate,
  required,
  name,
  id,
  showDatePicker,
  keyPressBehavior,
  clickPressBehavior,
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
  showSelectMonth,
  setShowSelectMonth,
  setTodayDate,
  eraseDate,
  pickerHeaderMonthId,
  previousMonth,
  nextMonth,
  handleSelection,
}: TDatePickerLayout) => {
  const ref = useOutsideClick(handleClickOutside)
  return (
    <div
      className="date-picker"
      ref={ref as LegacyRef<HTMLDivElement> | undefined}
    >
      <InputDate
        validDate={selectedDate}
        setValidDate={setSelectedDate}
        openOrCloseDatePicker={openOrCloseDatePicker}
        maxDate={maxDate}
        minDate={minDate}
      />
      <input
        className="hidden-input"
        type="hidden"
        id={id}
        name={name}
        required={required}
        value={
          selectedDate
            ? `${
                selectedDate.getDate() < 10 ? '0' : ''
              }${selectedDate.getDate()}-${
                selectedDate.getMonth() + 1 < 10 ? '0' : ''
              }${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`
            : ''
        }
      />

      {showDatePicker && (
        <div
          className="picker-wrapper"
          onKeyDown={keyPressBehavior}
          onClick={clickPressBehavior}
        >
          {showSelectMonth && (
            <SelectMonth
              minDate={minDate}
              maxDate={maxDate}
              currentMonth={currentMonth}
              currentYear={currentYear}
              setCurrentMonth={setCurrentMonth}
              setCurrentYear={setCurrentYear}
              setShowSelectMonth={setShowSelectMonth}
              showSelectMonth={showSelectMonth}
            />
          )}

          <div className="picker-header">
            <button
              className="picker-header-months"
              aria-label="select month button"
              onClick={(e) => {
                e.preventDefault()
                setShowSelectMonth(!showSelectMonth)
              }}
              id={pickerHeaderMonthId}
            >
              <p>
                {monthNames[currentMonth]} {currentYear}
              </p>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="choose-month-button"
              />
            </button>
            {!showSelectMonth && (
              <div className="picker-header-buttons">
                <button
                  id="picker-header-previous-button"
                  aria-label="previous month button"
                  onClick={previousMonth}
                  disabled={
                    minDate &&
                    minDate?.getTime() >
                      getTimeFromState(currentYear, currentMonth, 1)
                  }
                >
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="chevron-back-outline"
                  />
                </button>
                <button
                  id="picker-header-next-button"
                  aria-label="next month button"
                  onClick={nextMonth}
                  disabled={
                    maxDate &&
                    maxDate?.getTime() <
                      getTimeFromState(
                        currentYear,
                        currentMonth,
                        getNumberOfDaysInMonth(currentYear, currentMonth)
                      )
                  }
                >
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="chevron-forward-outline"
                  />
                </button>
              </div>
            )}
          </div>
          <div className="picker-body">
            <div className="seven-col-grid seven-col-grid-heading">
              {getSortedDays(currentYear, currentMonth).map((day, index) => (
                <p key={`${day}-sorted-days-${index}`}>{day}</p>
              ))}
            </div>
            <div className="seven-col-grid" onClick={handleSelection}>
              {range(
                1,
                getNumberOfDaysInMonth(currentYear, currentMonth) + 1
              ).map((day, index) => (
                <button
                  key={`${day}-${index}`}
                  id="day"
                  aria-label={`select ${day}/${currentMonth}/${currentYear} `}
                  data-day={day}
                  disabled={
                    (minDate &&
                      minDate?.getTime() >
                        getTimeFromState(currentYear, currentMonth, day)) ||
                    (maxDate &&
                      maxDate?.getTime() <
                        getTimeFromState(currentYear, currentMonth, day))
                  }
                  className={`${
                    selectedDate?.getTime() ===
                    new Date(currentYear, currentMonth, day, 0).getTime()
                      ? 'active'
                      : ''
                  } ${
                    getDayWithoutHour().getTime() ===
                      new Date(currentYear, currentMonth, day, 0).getTime() &&
                    selectedDate?.getTime() !==
                      new Date(currentYear, currentMonth, day, 0).getTime()
                      ? 'today'
                      : ''
                  }
                    `}
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="picker-body-buttons">
              <button
                id="picker-body-today-button"
                onClick={setTodayDate}
                aria-label="select today"
              >
                Today
              </button>
              <button
                id="picker-body-erase-button"
                onClick={eraseDate}
                aria-label="erase date"
              >
                Erase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
