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

export type TInputDateProps = {
  maxDate: Date | undefined
  minDate: Date | undefined
}

export type TInputDateKeyPressProps = {
  e: any
  selectedDate: TSelectedDate
  date: TDate
  openOrCloseDatePicker: (e: any) => void
  setSelectedDate: React.Dispatch<React.SetStateAction<TSelectedDate>>
}
