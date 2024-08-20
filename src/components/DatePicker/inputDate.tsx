import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { Dispatch, SetStateAction, useState } from 'react'

type TDate = {
  day: { name: string | number; maxValue: number }
  month: { name: string | number; maxValue: number }
  year: { name: string | number; maxValue: number | undefined }
}


const date: TDate = {
  day: {
    name: 'jj',
    maxValue: 31,
  },
  month: {
    name: 'mm',
    maxValue: 12,
  },
  year: {
    name: 'aaaa',
    maxValue: undefined,
  },
}

type TInputDate = {
  setShowDatePicker: Dispatch<SetStateAction<boolean>>
  showDatePicker: boolean
}

export const InputDate = ({
  setShowDatePicker,
  showDatePicker,
}: TInputDate) => {
  const [selectedDate, setSelectedDate] = useState<TDate>(date)

  const settingOnClick = (e: any) => {
    e.preventDefault()
    if (e.target.id) {
      e.target.focus()
    } else {
      e.target.closest('p').firstChild.focus()
    }
  }
  const settingOnKeyDown = (e: any) => {
    const keyPress = e.key
    const target = e.target
    const dataType = e.target.getAttribute('data-type')
    console.log(keyPress)
   

    // if (Number.isNaN(Number(keyPress))) return

    // If no date has been set before
    if (Number.isNaN(Number(target.innerHTML))) {
      console.log('target is not a number')
      if (keyPress === 'ArrowUp') {
        setSelectedDate({
          ...selectedDate,
          day: { name: 1, maxValue: selectedDate.day.maxValue },
        })
      }
      if (keyPress === 'ArrowDown') {
      }
    } else {
      if (keyPress === 'ArrowUp') {
      }
      if (keyPress === 'ArrowDown') {
      }
    }
  }

  return (
    <div className="input-date-wrapper">
      <input type="text" value={'jj/mm/aaaa'} />
      <p onClick={settingOnClick} onKeyDown={settingOnKeyDown}>
        <span
          id="input-day"
          data-type="day"
          className="input-date"
          tabIndex={0}
        >
          {selectedDate.day.name}
        </span>
        /
        <span
          id="input-month"
          data-type="month"
          className="input-date"
          tabIndex={0}
        >
          {selectedDate.month.name}
        </span>
        /
        <span
          id="input-year"
          data-type="year"
          className="input-date"
          tabIndex={0}
        >
          {selectedDate.year.name}
        </span>
      </p>
      <button onClick={() => setShowDatePicker(!showDatePicker)}>
        <FontAwesomeIcon className="input-date-calendar" icon={faCalendar} />
      </button>
    </div>
  )
}
