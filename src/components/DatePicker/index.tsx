import { LegacyRef, useEffect, useId, useRef, useState } from 'react'
import { SelectMonth } from './select-month/select-month-layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { monthNames } from './consts'
import {
  getDayWithoutHour,
  getNumberOfDaysInMonth,
  getSortedDays,
  getTimeFromState,
  isNewElementInParentElement,
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
  const pickerHeaderMonthId = useId()
  const [selectedDate, setSelectedDate] = useState<undefined | Date>(undefined)

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate.getMonth())
      setCurrentYear(selectedDate.getFullYear())
    }
  }, [selectedDate])

  useEffect(() => {
    if (showDatePicker) {
      const pickerHeaderMonth = document.getElementById(
        pickerHeaderMonthId
      ) as HTMLElement
      if (pickerHeaderMonth) pickerHeaderMonth.focus()
    }
  }, [showDatePicker])

  useEffect(() => {
    if (showSelectMonth) {
      const headerMonth = document.getElementById(
        `select-${currentYear}-header`
      ) as HTMLElement
      if (headerMonth) headerMonth.focus()
    } else {
      const pickerHeaderMonth = document.getElementById(
        pickerHeaderMonthId
      ) as HTMLElement
      if (pickerHeaderMonth) pickerHeaderMonth.focus()
    }
  }, [showSelectMonth])

  const handleClickOutside = () => {
    setShowDatePicker(false)
    setShowSelectMonth(false)
  }

  const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLElement | undefined>()
    useEffect(() => {
      const handleClick = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback()
        }
      }
      document.addEventListener('click', handleClick)
      return () => {
        document.removeEventListener('click', handleClick)
      }
    }, [ref])
    return ref
  }

  const ref = useOutsideClick(handleClickOutside)

  const closeDatePicker = () => {
    setShowDatePicker(false)
    setShowSelectMonth(false)
  }

  const openOrCloseDatePicker = (e: any | undefined) => {
    e?.preventDefault()
    if (showDatePicker) {
      closeDatePicker()
      return
    }
    setShowDatePicker(true)
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

  const keyPressBehavior = (e: any) => {
    if (showSelectMonth) return
    e.preventDefault()
    const allFocusableElements = document.querySelectorAll(
      '[tabindex], input:not(.hidden-input), button:not(:disabled)'
    )
    const focusable = [...allFocusableElements] as HTMLElement[]
    const index = focusable.indexOf(e.target)

    const nextElement = focusable[index + 1]
    const previousElement = focusable[index - 1]

    const isNextElementInParentElement = isNewElementInParentElement({
      newElement: nextElement,
      parentElementClassName: 'picker-wrapper',
    })

    const isPreviousElementInParentElement = isNewElementInParentElement({
      newElement: previousElement,
      parentElementClassName: 'picker-wrapper',
    })

    const buttonOpeningDatePicker = e.target
      .closest('.date-picker')
      .querySelector('.input-date-button')

    if (e.key === 'Escape') {
      closeDatePicker()
      buttonOpeningDatePicker?.focus()
      return
    }

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        previousElement.focus()
        if (!isPreviousElementInParentElement) closeDatePicker()
      } else {
        nextElement.focus()
        if (!isNextElementInParentElement) closeDatePicker()
      }
      return
    }

    if (e.key === 'ArrowLeft' && isPreviousElementInParentElement) {
      previousElement?.focus()
      return
    }

    if (e.key === 'ArrowRight' && isNextElementInParentElement) {
      nextElement?.focus()
      return
    }

    if (e.key === 'ArrowUp') {
      const allFocusElementsInParentElement = focusable.filter((element) =>
        element.closest('.picker-wrapper')
      )
      const indexInParentElement = allFocusElementsInParentElement.indexOf(
        e.target
      )

      if (e.target.id === 'day') {
        allFocusElementsInParentElement[
          indexInParentElement - 7 < 0 ? 0 : indexInParentElement - 7
        ].focus()
      }

      if (
        e.target.id === 'picker-body-today-button' ||
        e.target.id === 'picker-body-erase-button'
      ) {
        const days = allFocusElementsInParentElement.filter((element) =>
          element.getAttribute('data-day')
        )
        const lastDay = days[days.length - 1]
        lastDay.focus()
      }

      if (e.target.closest('.picker-header')) {
        focusable[
          focusable.indexOf(allFocusElementsInParentElement[0]) - 1
        ].focus()
        closeDatePicker()
      }
      return
    }

    if (e.key === 'ArrowDown') {
      const allFocusElementsInParentElement = focusable.filter((element) =>
        element.closest('.picker-wrapper')
      )
      const indexInParentElement = allFocusElementsInParentElement.indexOf(
        e.target
      )
      const length = allFocusElementsInParentElement.length - 1

      if (e.target.id === 'day') {
        allFocusElementsInParentElement[
          indexInParentElement + 7 > length
            ? length - 1
            : indexInParentElement + 7
        ].focus()
      }

      if (
        e.target.id === 'picker-body-today-button' ||
        e.target.id === 'picker-body-erase-button'
      ) {
        focusable[
          focusable.indexOf(allFocusElementsInParentElement[length]) + 1
        ].focus()
        closeDatePicker()
      }

      if (e.target.closest('.picker-header')) {
        const firstDay = allFocusElementsInParentElement.find(
          (element) => element.getAttribute('data-day') === '1'
        )
        firstDay?.focus()
      }
      return
    }

    if (e.key === 'Enter') {
      if (e.target.className === 'picker-header-months') {
        setShowSelectMonth(!showSelectMonth)
      }
      if (e.target.id === 'day') {
        handleSelection(e)
      }
      if (e.target.id === 'picker-header-previous-button') {
        previousMonth(e)
      }
      if (e.target.id === 'picker-header-next-button') {
        nextMonth(e)
      }
      if (e.target.id === 'picker-body-today-button') {
        setTodayDate(e)
      }
      if (e.target.id === 'picker-body-erase-button') {
        eraseDate(e)
      }
      return
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
