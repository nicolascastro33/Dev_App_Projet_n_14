import { useEffect, useState } from 'react'
import arrow from '../../assets/arrow.png'
import { monthNames } from './consts'
import {
  getDayWithoutHour,
  getNumberOfDaysInMonth,
  getSortedDays,
  range,
} from './utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

export const DatePicker = ({
  minDate,
  maxDate,
}: {
  minDate: undefined | Date
  maxDate: undefined | Date
}) => {
  const [showDatePicker, setShowDatePicker] = useState(true)
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  )
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  )

  const [selectedDate, setSelectedDate] = useState<undefined | Date>(
    getDayWithoutHour()
  )

  useEffect(() => {}, [])

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
    console.log(new Date().getTime())
    setCurrentMonth(new Date().getMonth())
    setCurrentYear(new Date().getFullYear())
    setSelectedDate(getDayWithoutHour())
  }

  const getTimeFromState = (day: number) => {
    return new Date(currentYear, currentMonth, day).getTime()
  }

  const correctDateInput = (e: any) => {
    const value = e.target.value
    const lastValue = value.charAt(value.length - 1)

    if (value.length === 1) {
      if (Number.isNaN(Number(lastValue)) || Number(lastValue) > 3) {
        e.target.value = ''
      }
    }
    if (value.length === 2) {
      if (!Number.isNaN(Number(lastValue)) || Number(value) <= 31) {
        e.target.value = value + '/'
      }
    }
  }

  return (
    <>
      <div className="input-date-wrapper">
        <input type="text" onInput={correctDateInput} />
        <button onClick={() => setShowDatePicker(!showDatePicker)}>
          <FontAwesomeIcon className="input-date-calendar" icon={faCalendar} />
        </button>
      </div>

      {showDatePicker && (
        <div className="picker-wrapper">
          <div className="picker-header">
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

            <p>
              {monthNames[currentMonth]} {currentYear}
            </p>
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