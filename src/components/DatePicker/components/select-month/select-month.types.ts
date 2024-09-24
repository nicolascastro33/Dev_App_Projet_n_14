import { Dispatch, SetStateAction } from 'react'

export type TSelectMonthLayout = {
  minDate: Date | undefined
  maxDate: Date | undefined
  closeSelectMonth: (e: any) => void
  keyPressBehavior: (e: any) => void
  clickOnYear: (e: any, year: number) => void
  selectAMonth: (indexMonth: number, year: number) => void
  isOpen: boolean
  yearOpen: number
  currentMonth: number
  currentYear: number
}

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

export type TSelectMonthKeyDownProps = {
  e: any
  showSelectMonth: boolean
  setShowSelectMonth: React.Dispatch<React.SetStateAction<boolean>>
  yearOpen: number
  clickOnYear: (e: any, year: number) => void
  selectAMonth: (indexMonth: number, year: number) => void
}
