export type TDatePickerProps = {
  id: string
  name: string
  required: boolean | undefined
  minDate: undefined | Date
  maxDate: undefined | Date
}

export type TDatePickerLayoutProps = Omit<TDatePickerProps, 'minDate' | 'maxDate'>

export type TDatePickerKeyPressProps = {
  e: any
  showSelectMonth: boolean
  closeDatePicker: () => void
  setShowSelectMonth: React.Dispatch<React.SetStateAction<boolean>>
  handleSelection: (e: any) => void
  prevMonth: (e: any) => void
  nextMonth: (e: any) => void
  setTodayDate: (e: any) => void
  eraseDate: (e: any) => void
}

export type TDate = {
  day: { name: string; maxValue: number; minValue: number }
  month: {
    name: string
    maxValue: number
    minValue: number
  }
  year: {
    name: string
    maxValue: number
    minValue: number
  }
}

export type TSelectedDate = {
  day: number | undefined
  month: number | undefined
  year: number | undefined
}


export type TInputDateKeyPressProps = {
  e: any
  selectedDate: TSelectedDate
  date: TDate
  openOrCloseDatePicker: (e: any) => void
  setSelectedDate: React.Dispatch<React.SetStateAction<TSelectedDate>>
}

export type TSelectMonthKeyPressProps = {
  e: any
  showSelectMonth: boolean
  setShowSelectMonth: React.Dispatch<React.SetStateAction<boolean>>
  yearOpen: number
  clickOnYear: (year: number) => void
  selectAMonth: (indexMonth: number, year: number) => void
}
