import { useEffect, useId, useState } from 'react'
import { getDayWithoutHour } from './utils'
import './style.css'
import { DatePickerLayout } from './date-picker.layout'
import { TDatePickerProps } from './date-picker.types'
import { DatePickerKeyDown } from './date-picker.keydown'

export const DatePicker = ({
  id,
  name,
  required,
  minDate,
  maxDate,
}: TDatePickerProps) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
  const [showSelectMonth, setShowSelectMonth] = useState<boolean>(false)
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  )
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  )
  const pickerHeaderMonthId = useId()
  const [selectedDate, setSelectedDate] = useState<undefined | Date>()

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
    <DatePickerLayout
      handleClickOutside={closeDatePicker}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      setCurrentMonth={setCurrentMonth}
      setCurrentYear={setCurrentYear}
      openOrCloseDatePicker={openOrCloseDatePicker}
      maxDate={maxDate}
      minDate={minDate}
      required={required}
      name={name}
      id={id}
      showDatePicker={showDatePicker}
      keyPressBehavior={(e: any) => {
        DatePickerKeyDown({
          e,
          showSelectMonth,
          closeDatePicker,
          setShowSelectMonth,
          handleSelection,
          previousMonth,
          nextMonth,
          setTodayDate,
          eraseDate,
        })
      }}
      clickPressBehavior={clickPressBehavior}
      currentMonth={currentMonth}
      currentYear={currentYear}
      showSelectMonth={showSelectMonth}
      setShowSelectMonth={setShowSelectMonth}
      setTodayDate={setTodayDate}
      eraseDate={eraseDate}
      pickerHeaderMonthId={pickerHeaderMonthId}
      previousMonth={previousMonth}
      nextMonth={nextMonth}
      handleSelection={handleSelection}
    />
  )
}
