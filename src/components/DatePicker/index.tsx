import { useEffect, useState } from 'react'
import arrow from '../../assets/arrow.png'
import { monthNames } from './consts'
import { getNumberOfDaysInMonth, getSortedDays, range } from './utils'

export const DatePicker = ({
  minDate,
  maxDate,
}: {
  minDate: undefined | Date
  maxDate: undefined | Date
}) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  )
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  )

  const [selectedDate, setSelectedDate] = useState<undefined | Date>(new Date())

  useEffect(() => {
    console.log(selectedDate)
  }, [selectedDate])

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
    setSelectedDate(new Date())
  }

  const getTimeFromState = (day: number) => {
    return new Date(currentYear, currentMonth, day).getTime()
  }

  return (
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
            maxDate?.getTime() >
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
          {range(1, getNumberOfDaysInMonth(currentYear, currentMonth) + 1).map(
            (day, index) => (
              <button
                key={day + '-' + index}
                id="day"
                data-day={day}
                disabled={
                  (minDate && minDate?.getTime() > getTimeFromState(day)) ||
                  (maxDate && maxDate?.getTime() < getTimeFromState(day))
                }
                className={
                  selectedDate?.getDate() ===
                  new Date(currentYear, currentMonth, day).getDate()
                    ? 'active'
                    : ''
                }
              >
                {day}
              </button>
            )
          )}
        </div>
        <div className="picker-body-buttons">
          <button onClick={setTodayDate}>Today</button>
          <button onClick={() => setSelectedDate(undefined)}>Erase</button>
        </div>
      </div>
    </div>
  )
}
