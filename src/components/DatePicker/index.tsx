import { useState } from 'react'
import { SelectMonth } from './selectMonth'
import arrow from '../../assets/arrow.png'
import { monthNames } from './consts'
import {
  getDayWithoutHour,
  getNumberOfDaysInMonth,
  getSortedDays,
  range,
} from './utils'
import { InputDate } from './inputDate'

export const DatePicker = ({
  minDate,
  maxDate,
}: {
  minDate: undefined | Date
  maxDate: undefined | Date
}) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
  const [showSelectMonth, setShowSelectMonth] = useState<boolean>(false)
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  )
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  )

  const [selectedDate, setSelectedDate] = useState<undefined | Date>(
    getDayWithoutHour()
  )

  const openOrCloseDatePicker = () => {
    if (showDatePicker) {
      setShowDatePicker(false)
      setCurrentMonth(new Date().getMonth())
      setCurrentYear(new Date().getFullYear())
    } else {
      setShowDatePicker(true)
    }
  }

  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth(currentMonth + 1)
    } else {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    }
  }

  const previousMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1)
    } else {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    }
  }

  const handleSelection = (event: any) => {
    if (event.target.id === 'day') {
      setSelectedDate(
        new Date(
          currentYear,
          currentMonth,
          event.target.getAttribute('data-day')
        )
      )
    }
  }

  const setTodayDate = () => {
    setCurrentMonth(new Date().getMonth())
    setCurrentYear(new Date().getFullYear())
    setSelectedDate(getDayWithoutHour())
  }

  const getTimeFromState = (day: number) => {
    return new Date(currentYear, currentMonth, day).getTime()
  }

  return (
    <>
      <InputDate
        openOrCloseDatePicker={openOrCloseDatePicker}
        maxYearDate={maxDate?.getFullYear()}
        minYearDate={minDate?.getFullYear()}
      />

      {showDatePicker && (
        <div className="picker-wrapper">
          {showSelectMonth && (
            <SelectMonth
              minDate={minDate}
              maxDate={maxDate}
              currentMonth={currentMonth}
              currentYear={currentYear}
              setCurrentMonth={setCurrentMonth}
              setCurrentYear={setCurrentYear}
              setShowSelectMonth={setShowSelectMonth}
            />
          )}

          <div className="picker-header">
            <div
              className="picker-header-months"
              onClick={() => setShowSelectMonth(!showSelectMonth)}
            >
              <p>
                {monthNames[currentMonth]} {currentYear}
              </p>
              <button disabled={showSelectMonth}>
                <img
                  src={arrow}
                  alt="choose-month-button"
                  className="choose-month-button"
                />
              </button>
            </div>
            {!showSelectMonth && (
              <div className="picker-header-buttons">
                <button
                  onClick={previousMonth}
                  disabled={minDate && minDate?.getTime() > getTimeFromState(1)}
                >
                  <img
                    src={arrow}
                    alt="chevron-back-outline"
                    className="chevron-back-outline"
                  />
                </button>
                <button
                  onClick={nextMonth}
                  disabled={
                    maxDate &&
                    maxDate?.getTime() <
                      getTimeFromState(
                        getNumberOfDaysInMonth(currentYear, currentMonth)
                      )
                  }
                >
                  <img
                    src={arrow}
                    className="chevron-forward-outline"
                    alt="chevron-forward-outline"
                  />
                </button>
              </div>
            )}
          </div>
          <div className="picker-body">
            <div className="seven-col-grid seven-col-grid-heading">
              {getSortedDays(currentYear, currentMonth).map((day, index) => (
                <p key={day + '-sorted-days-' + index}>{day}</p>
              ))}
            </div>
            <div className="seven-col-grid" onClick={handleSelection}>
              {range(
                1,
                getNumberOfDaysInMonth(currentYear, currentMonth) + 1
              ).map((day, index) => (
                <button
                  key={day + '-' + index}
                  id="day"
                  data-day={day}
                  disabled={
                    (minDate && minDate?.getTime() > getTimeFromState(day)) ||
                    (maxDate && maxDate?.getTime() < getTimeFromState(day))
                  }
                  className={
                    selectedDate?.getTime() ===
                    new Date(currentYear, currentMonth, day, 0).getTime()
                      ? 'active'
                      : ''
                  }
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="picker-body-buttons">
              <button onClick={setTodayDate}>Today</button>
              <button onClick={() => setSelectedDate(undefined)}>Erase</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
