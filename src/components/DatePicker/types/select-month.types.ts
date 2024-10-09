export type TSelectMonthProps = {
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
