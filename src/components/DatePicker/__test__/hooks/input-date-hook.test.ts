import { describe, assert, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useInputDate } from '../../hooks/input-date.hook'

describe('Input Date Hook', () => {
  it('should set a minimum year and a maximum year', () => {
    const { result } = renderHook(() =>
      useInputDate({ minYear: 1990, maxYear: 2000 })
    )
    assert.equal(result.current.date.year.minValue, 1990)
    assert.equal(result.current.date.year.maxValue, 2000)
  })

  it('should get a selected date valid', () => {
    const { result } = renderHook(() =>
      useInputDate({ validDate: new Date(2000, 10, 2, 0) })
    )
    assert.equal(result.current.selectedDate.year, 2000)
    assert.equal(result.current.selectedDate.month, 10)
    assert.equal(result.current.selectedDate.day, 2)
  })

  it('should render a buttonId', () => {
    const { result } = renderHook(useInputDate)
    assert(result.current.buttonId)
  })
})
