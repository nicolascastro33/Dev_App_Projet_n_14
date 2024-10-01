import { PropsWithChildren, useState } from 'react'

interface Props extends PropsWithChildren<any> {
  opened?: boolean
  yearOpen?: number
}

const defaultProps = {
  opened: false,
  yearOpen: new Date().getFullYear(),
}

export function useSelectMonth(props: Props = defaultProps) {
  const [isOpen, setIsOpen] = useState<boolean>(props.opened!)
  const [yearOpen, setYearOpen] = useState<number>(props.yearOpen!)

  return {
    clickOnYear: (year: number) => {
      if (yearOpen === year) {
        setIsOpen(!isOpen)
        return
      }
      setIsOpen(false)
      setYearOpen(year)
      setIsOpen(true)
    },
    yearOpen,
    isOpen,
  }
}
