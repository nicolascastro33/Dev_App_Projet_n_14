import { describe, assert, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDatePicker } from '../../date-picker.hook'
import { getDayWithoutHour } from '../../utils'

describe('Date Picker hook', () => {
  it('Should be closed by default', () => {
    const { result } = renderHook(useDatePicker)
    assert.equal(result.current.isOpen, false)
  })

  it('Can be opened by default', () => {
    const { result } = renderHook(() => useDatePicker({ opened: true }))
    assert.equal(result.current.isOpen, true)
  })

  it('Date should be undefined by default', () => {
    const { result } = renderHook(useDatePicker)
    assert.isUndefined(result.current.selectedDate)
  })

  it('Can open then datepicker', () => {
    const { result } = renderHook(useDatePicker)
    act(() => result.current.open())
    assert.equal(result.current.isOpen, true)
  })

  it('Can close the datepicker', () => {
    const { result } = renderHook(() => useDatePicker({ opened: true }))
    act(() => result.current.close())
    assert.equal(result.current.isOpen, false)
  })

  it('Can toggle open/close of the datepicker', () => {
    const { result } = renderHook(useDatePicker)

    act(() => result.current.toggleOpen())
    assert.equal(result.current.isOpen, true)

    act(() => result.current.toggleOpen())
    assert.equal(result.current.isOpen, false)
  })

  it('Can select the date', () => {
    const { result } = renderHook(useDatePicker)

    act(() => result.current.selectDate(new Date(2022, 1, 1)))
    assert.equal(
      result.current.selectedDate?.toISOString(),
      new Date(2022, 1, 1).toISOString()
    )
  })

  it('Can erase the date', () => {
    const { result } = renderHook(() =>
      useDatePicker({ selectedDate: new Date(2022, 1, 1) })
    )

    act(() => result.current.eraseDate())
    assert.isUndefined(result.current.selectedDate)
  })

  it('Should close the datepicker when a date is selected', () => {
    const { result } = renderHook(() => useDatePicker({ opened: true }))
    act(() => result.current.selectDate(new Date(2022, 1, 1)))
    assert.equal(result.current.isOpen, false)
  })

  it('should set next month', () => {
    const { result } = renderHook(() => useDatePicker({ month: 2 }))
    act(() => result.current.nextMonth())
    assert.equal(result.current.month, 3)
  })

  it('should set next year with first month', () => {
    const { result } = renderHook(() => useDatePicker({ month: 11, year: 2 }))
    act(() => result.current.nextMonth())
    assert.equal(result.current.month, 0)
    assert.equal(result.current.year, 3)
  })

  it('should set previous month', () => {
    const { result } = renderHook(() => useDatePicker({ month: 2 }))
    act(() => result.current.prevMonth())
    assert.equal(result.current.month, 1)
  })

  it('should set previous year with last month', () => {
    const { result } = renderHook(() => useDatePicker({ month: 0, year: 2 }))
    act(() => result.current.prevMonth())
    assert.equal(result.current.month, 11)
    assert.equal(result.current.year, 1)
  })

  it('should set the month and the year when a date is selected', () => {
    const { result } = renderHook(() => useDatePicker({}))
    act(() => result.current.selectDate(new Date(2022, 2, 2)))
    assert.equal(result.current.month, 2)
    assert.equal(result.current.year, 2022)
  })

  it('should set today date', () => {
    const { result } = renderHook(() => useDatePicker({}))
    const todayDate = getDayWithoutHour()
    act(() => result.current.setTodayDate())
    assert.equal(
      result.current.selectedDate?.toISOString(),
      todayDate.toISOString()
    )
  })
})
