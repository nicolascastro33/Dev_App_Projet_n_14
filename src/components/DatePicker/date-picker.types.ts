export type TDatePickerLayout = {
  handleClickOutside: () => void
  selectedDate: Date | undefined
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  openOrCloseDatePicker: (e: any | undefined) => void
  maxDate: Date | undefined
  minDate: Date | undefined
  required: boolean | undefined
  name: string
  id: string
  showDatePicker: boolean
  keyPressBehavior: (e: any) => void
  clickPressBehavior: (e: any) => void
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>
  currentMonth: number
  currentYear: number
  showSelectMonth: boolean
  setShowSelectMonth: React.Dispatch<React.SetStateAction<boolean>>
  setTodayDate: (e: any) => void
  eraseDate: (e: any) => void
  pickerHeaderMonthId: string
  previousMonth: (e: any) => void
  nextMonth: (e: any) => void
  handleSelection: (e: any) => void
}

export type TDatePickerProps = {
  id: string
  name: string
  required: boolean | undefined
  minDate: undefined | Date
  maxDate: undefined | Date
}

export type TDatePickerKeyDownProps = {
  e: any
  showSelectMonth: boolean
  closeDatePicker: () => void
  setShowSelectMonth: React.Dispatch<React.SetStateAction<boolean>>
  handleSelection: (e: any) => void
  previousMonth: (e: any) => void
  nextMonth: (e: any) => void
  setTodayDate: (e: any) => void
  eraseDate: (e: any) => void
}

export type MouseEvent = React.MouseEvent<HTMLTextAreaElement>
export type KeypressEvent = React.KeyboardEvent<HTMLElement>
