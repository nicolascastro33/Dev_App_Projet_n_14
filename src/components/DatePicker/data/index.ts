import { TDate } from '../types/date-picker.types'

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const dayNames = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const GlobalDate = ({
  minDate,
  maxDate,
}: {
  minDate: Date | undefined
  maxDate: Date | undefined
}): TDate => {
  return {
    day: {
      name: 'jj',
      maxValue: 31,
      minValue: 1,
    },
    month: {
      name: 'mm',
      maxValue: 12,
      minValue: 1,
    },
    year: {
      name: 'aaaa',
      minValue: minDate?.getFullYear() ?? new Date().getFullYear() - 50,
      maxValue: maxDate?.getFullYear() ?? new Date().getFullYear() + 50,
    },
  }
}
