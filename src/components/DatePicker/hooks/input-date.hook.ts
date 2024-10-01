import { PropsWithChildren, useEffect, useId, useMemo, useState } from 'react'
import { TDate, TSelectedDate } from '../types/input-date.types'
import { isSelectedDateValid } from '../utils'

interface Props extends PropsWithChildren<any> {
  minYear?: number
  maxYear?: number
  validDate?: Date
  setValidDate?: React.Dispatch<React.SetStateAction<Date | undefined>>
}

const defaultProps = {
  minYear: new Date().getFullYear() - 50,
  maxYear: new Date().getFullYear() + 50,
}

export function useInputDate(props: Props = defaultProps) {
  const date: TDate = {
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
      minValue: props.minYear!,
      maxValue: props.maxYear!,
    },
  }
  const [selectedDate, setSelectedDate] = useState<TSelectedDate>({
    day: props.validDate ? props.validDate.getDate() : undefined,
    month: props.validDate ? props.validDate.getMonth() : undefined,
    year: props.validDate ? props.validDate.getFullYear() : undefined,
  })
  const buttonId = useId()
  const isValid = useMemo<undefined | Date>(
    () => isSelectedDateValid(selectedDate),
    [selectedDate]
  )

  useEffect(() => {
    if (props.setValidDate) props.setValidDate(isValid)
  }, [isValid])

  useEffect(() => {
    if (props.validDate === isValid) return
    if (props.validDate) {
      setSelectedDate({
        day: props.validDate.getDate(),
        month: props.validDate.getMonth() + 1,
        year: props.validDate.getFullYear(),
      })
    } else {
      setSelectedDate({
        day: undefined,
        month: undefined,
        year: undefined,
      })
    }
  }, [props.validDate])

  return {
    date,
    selectedDate,
    setSelectedDate,
    buttonId,
    isValid,
  }
}
