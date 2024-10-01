import { describe, assert, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSelectMonth } from '../../hooks/select-month.hook'

describe('Select Month Hook', () => {
  it('should return the year put in the props and the year should be close', () => {
    const { result } = renderHook(useSelectMonth)
    assert.equal(result.current.yearOpen, new Date().getFullYear())
    assert.equal(result.current.isOpen, false)
  })
  it('should open the new year selected', () => {
    const { result } = renderHook(()=> useSelectMonth({yearOpen: 2005}))
    act(() => result.current.clickOnYear(1999))
    assert.equal(result.current.yearOpen, 1999)
    assert.equal(result.current.isOpen, true)
  })

  it('should close the year', () => {
    const { result } = renderHook(() =>
      useSelectMonth({ yearOpen: 2000, opened: true })
    )
    act(() => result.current.clickOnYear(2000))
    assert.equal(result.current.yearOpen, 2000)
    assert.equal(result.current.isOpen, false)
  })
})
