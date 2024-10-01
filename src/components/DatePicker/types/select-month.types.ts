import { Dispatch, SetStateAction } from 'react'

export type TSelectMonthProps = {
  currentMonth: number
  currentYear: number
  setCurrentMonth: Dispatch<SetStateAction<number>>
  setCurrentYear: Dispatch<SetStateAction<number>>
  setShowSelectMonth: Dispatch<SetStateAction<boolean>>
  showSelectMonth: boolean
  maxDate: Date | undefined
  minDate: Date | undefined
}

export type TSelectMonthKeyPressProps = {
  e: any
  showSelectMonth: boolean
  setShowSelectMonth: React.Dispatch<React.SetStateAction<boolean>>
  yearOpen: number
  clickOnYear: (year: number) => void
  selectAMonth: (indexMonth: number, year: number) => void
}
