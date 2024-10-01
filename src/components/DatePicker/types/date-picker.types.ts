export type TDatePickerProps = {
  id: string
  name: string
  required: boolean | undefined
  minDate: undefined | Date
  maxDate: undefined | Date
}

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

