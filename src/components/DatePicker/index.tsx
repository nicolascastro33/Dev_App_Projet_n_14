import { useEffect, useState } from 'react'
import { SelectMonth } from './select-month/select-month-layout'
import arrow from '../../assets/arrow.png'
import { monthNames } from './consts'
import {
  getDayWithoutHour,
  getNumberOfDaysInMonth,
  getSortedDays,
  range,
} from './utils'
import { InputDate } from './input-date/input-date-layout'
import './style.css'

export const DatePicker = ({
  id,
  name,
  required,
  minDate,
  maxDate,
}: {
  id: string
  name: string
  required: boolean | undefined
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

  const [selectedDate, setSelectedDate] = useState<undefined | Date>(undefined)

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate.getMonth())
      setCurrentYear(selectedDate.getFullYear())
    }
  }, [selectedDate])

  const openOrCloseDatePicker = (e: any) => {
    e.preventDefault()
    if (showDatePicker) {
      setShowDatePicker(false)
      setShowSelectMonth(false)
    } else {
      setShowDatePicker(true)
    }
  }

  const nextMonth = (e: any) => {
    e.preventDefault()
    if (currentMonth < 11) {
      setCurrentMonth(currentMonth + 1)
    } else {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    }
  }

  const previousMonth = (e: any) => {
    e.preventDefault()
    if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1)
    } else {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    }
  }

  const handleSelection = (e: any) => {
    e.preventDefault()
    if (e.target.id === 'day') {
      setSelectedDate(
        new Date(currentYear, currentMonth, e.target.getAttribute('data-day'))
      )
      setShowDatePicker(false)
    }
  }

  const setTodayDate = (e: any) => {
    e.preventDefault()
    setSelectedDate(getDayWithoutHour())
    setShowDatePicker(false)
  }

  const eraseDate = (e: any) => {
    e.preventDefault()
    setSelectedDate(undefined)
  }

  const getTimeFromState = (day: number) => {
    return new Date(currentYear, currentMonth, day).getTime()
  }

  const keyPressBehavior = (e: any) => {
    e.preventDefault()
    if (e.key === 'Escape') {
      setShowDatePicker(false)
      return
    }

    const parentElement = e.target.closest('.picker-wrapper')
    const allFocusableParentElements = parentElement.querySelectorAll(
      '[tabindex], input:not(.hidden-input), button:not(:disabled)'
    )
    const focusable = [...allFocusableParentElements] as HTMLElement[]
    const index = focusable.indexOf(e.target)

    if (e.key.includes('Arrow') || e.key === 'Tab') {
      if (
        (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) &&
        index - 1 >= 0
      ) {
        focusable[index - 1].focus()
        return
      }

      if (
        (e.key === 'ArrowRight' || (e.key === 'Tab' && !e.shiftKey)) &&
        index + 1 <= focusable.length - 1
      ) {
        focusable[index + 1].focus()
        return
      }

      if (e.key === 'ArrowUp') {
        if (index > 2) {
          const indexNewFocus = index - 7 < 0 ? 0 : index - 7
          focusable[indexNewFocus].focus()
        } else {
          const allFocusableElements = document.querySelectorAll(
            '[tabindex], input:not(.hidden-input), button:not(:disabled)'
          )
          const allFocusable = [...allFocusableElements] as HTMLElement[]
          const index = allFocusable.indexOf(focusable[0])
          allFocusable[index - 1].focus()
          openOrCloseDatePicker(e)
        }
        return
      }

      if (e.key === 'ArrowDown') {
        if (index < focusable.length - 2) {
          const indexNewFocus =
            index + 7 >= focusable.length - 1 ? focusable.length - 2 : index + 7
          focusable[indexNewFocus].focus()
        } else {
          const allFocusableElements = document.querySelectorAll(
            '[tabindex], input:not(.hidden-input), button:not(:disabled)'
          )
          const allFocusable = [...allFocusableElements] as HTMLElement[]
          const index = allFocusable.indexOf(focusable[focusable.length - 1])
          allFocusable[index + 1].focus()
          openOrCloseDatePicker(e)
        }

        return
      }
    }
    if (e.key === 'Enter') {
      console.log(e.target)
      if (e.target.className === 'picker-header-months') {
        setShowSelectMonth(!showSelectMonth)
        return
      }
      if (e.target.id === 'day') {
        handleSelection(e)
        return
      }
      if (e.target.id === 'picker-header-previous-button') {
        previousMonth(e)
        return
      }
      if (e.target.id === 'picker-header-next-button') {
        nextMonth(e)
        return
      }
      if (e.target.id === 'picker-body-today-button') {
        setTodayDate(e)
        return
      }
      if (e.target.id === 'picker-body-erase-button') {
        eraseDate(e)
        return
      }
    }
  }

  return (
    <div className="date-picker">
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
          className="picker-wrapper show-picker"
          onKeyDown={keyPressBehavior}
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
            />
          )}

          <div className="picker-header">
            <button
              className="picker-header-months"
              onClick={() => setShowSelectMonth(!showSelectMonth)}
            >
              <p>
                {monthNames[currentMonth]} {currentYear}
              </p>
              <img
                src={arrow}
                alt="choose-month-button"
                className="choose-month-button"
              />
            </button>
            {!showSelectMonth && (
              <div className="picker-header-buttons">
                <button
                  id="picker-header-previous-button"
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
                  id="picker-header-next-button"
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
                  data-day={day}
                  disabled={
                    (minDate && minDate?.getTime() > getTimeFromState(day)) ||
                    (maxDate && maxDate?.getTime() < getTimeFromState(day))
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
              <button id="picker-body-today-button" onClick={setTodayDate}>
                Today
              </button>
              <button id="picker-body-erase-button" onClick={eraseDate}>
                Erase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
