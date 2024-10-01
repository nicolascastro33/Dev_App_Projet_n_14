import { LegacyRef, useEffect, useId } from 'react'
import { SelectMonth } from './components/select-month'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { monthNames } from './data/day&monthNames'
import {
  getDayWithoutHour,
  getNumberOfDaysInMonth,
  getSortedDays,
  getTimeFromState,
  range,
} from './utils'
import { InputDate } from './components/input-date'
import './style.css'
import { useOutsideClick } from './utils/use-outside-click'
import { TDatePickerProps } from './types/date-picker.types'
import { useDatePicker } from './hooks/date-picker.hook'
import { DatePickerKeyPress } from './keypress/keypress-controller/date-picker.keypress'

export const DatePicker = ({
  maxDate,
  minDate,
  required,
  name,
  id,
}: TDatePickerProps) => {
  const {
    isOpen,
    close,
    toggleOpen,
    month,
    year,
    showSelectMonth,
    setShowSelectMonth,
    selectedDate,
    setSelectedDate,
    nextMonth,
    prevMonth,
    setMonth,
    setYear,
    setTodayDate,
    eraseDate,
  } = useDatePicker()
  const ref = useOutsideClick(close)
  const pickerHeaderMonthId = useId()

  useEffect(() => {
    if (isOpen) {
      const pickerHeaderMonth = document.getElementById(
        pickerHeaderMonthId
      ) as HTMLElement
      if (pickerHeaderMonth) pickerHeaderMonth.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (showSelectMonth) {
      const headerMonth = document.getElementById(
        `select-${year}-header`
      ) as HTMLElement
      if (headerMonth) headerMonth.focus()
    } else {
      const pickerHeaderMonth = document.getElementById(
        pickerHeaderMonthId
      ) as HTMLElement
      if (pickerHeaderMonth) pickerHeaderMonth.focus()
    }
  }, [showSelectMonth])

  const handleSelection = (e: any) => {
    e.preventDefault()
    if (e.target.id === 'day') {
      setSelectedDate(new Date(year, month, e.target.getAttribute('data-day')))
      close()
    }
  }

  const clickPressBehavior = (e: any) => {
    const eventClassName = e.target.className
    const buttonMonth = document.getElementById(pickerHeaderMonthId)
    if (
      eventClassName.includes('picker-wrapper') ||
      eventClassName === 'picker-header'
    ) {
      buttonMonth?.focus()
      return
    }
    if (eventClassName === 'picker-body-buttons') {
      const todayButton = document.getElementById(
        'picker-body-today-button'
      ) as HTMLElement
      todayButton?.focus()
      return
    }
    if (eventClassName === 'seven-col-grid' || e.target.disabled) {
      const firstDay = [...document.querySelectorAll('#day')].find(
        (day) => day.getAttribute('data-day') === '1'
      ) as HTMLElement
      firstDay?.focus()
      return
    }
  }

  return (
    <div
      className="date-picker"
      ref={ref as LegacyRef<HTMLDivElement> | undefined}
    >
      <InputDate
        validDate={selectedDate}
        setValidDate={setSelectedDate}
        openOrCloseDatePicker={toggleOpen}
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

      {isOpen && (
        <div
          className="picker-wrapper"
          onKeyDown={(e) =>
            DatePickerKeyPress({
              e,
              showSelectMonth,
              closeDatePicker: close,
              setShowSelectMonth,
              handleSelection,
              prevMonth,
              nextMonth,
              setTodayDate,
              eraseDate,
            })
          }
          onClick={clickPressBehavior}
        >
          {showSelectMonth && (
            <SelectMonth
              minDate={minDate}
              maxDate={maxDate}
              currentMonth={month}
              currentYear={year}
              setCurrentMonth={setMonth}
              setCurrentYear={setYear}
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
                {monthNames[month]} {year}
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
                  onClick={prevMonth}
                  disabled={
                    minDate &&
                    minDate?.getTime() > getTimeFromState(year, month, 1)
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
                        year,
                        month,
                        getNumberOfDaysInMonth(year, month)
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
              {getSortedDays(year, month).map((day, index) => (
                <p key={`${day}-sorted-days-${index}`}>{day}</p>
              ))}
            </div>
            <div className="seven-col-grid" onClick={handleSelection}>
              {range(1, getNumberOfDaysInMonth(year, month) + 1).map(
                (day, index) => (
                  <button
                    key={`${day}-${index}`}
                    id="day"
                    aria-label={`select ${day}/${month}/${year} `}
                    data-day={day}
                    disabled={
                      (minDate &&
                        minDate?.getTime() >
                          getTimeFromState(year, month, day)) ||
                      (maxDate &&
                        maxDate?.getTime() < getTimeFromState(year, month, day))
                    }
                    className={`${
                      selectedDate?.getTime() ===
                      new Date(year, month, day, 0).getTime()
                        ? 'active'
                        : ''
                    } ${
                      getDayWithoutHour().getTime() ===
                        new Date(year, month, day, 0).getTime() &&
                      selectedDate?.getTime() !==
                        new Date(year, month, day, 0).getTime()
                        ? 'today'
                        : ''
                    }
                    `}
                  >
                    {day}
                  </button>
                )
              )}
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
