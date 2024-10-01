import { PropsWithChildren, useEffect, useState } from 'react'
import { SelectMenuOptionsType } from '.'
import { useOutsideClick } from './utils/use-outside-click'

interface Props extends PropsWithChildren<any> {
  opened?: boolean
  optionsProps?: SelectMenuOptionsType
  value?: string
}

const defaultProps = {
  opened: false,
}

export function useSelectMenu(props: Props = defaultProps) {
  const [selectedItem, setSelectedItem] = useState<null | string>(
    props.value && props.value?.length > 1 ? props.value : null
  )
  const [activeMenu, setActiveMenu] = useState<boolean>(false)
  const [options, setOptions] = useState<SelectMenuOptionsType>(
    props.optionsProps!
  )

  useEffect(() => {
    if (props.value) setSelectedItem(props.value)
  }, [props.value])

  const close = () => {
    setActiveMenu(false)
    setOptions(options)
  }

  return {
    close,
    toggle: () => {
      if (activeMenu) {
        close()
      } else {
        setActiveMenu(true)
      }
    },
    selectOption: (option: string) => {
      setSelectedItem(option)
      close()
    },
    filteredData: (e: any) => {
      const searchValue = e.target.value.trim().toLowerCase()
      if (!searchValue) {
        setOptions(props.optionsProps!)
        return
      }
      const filtered = options.filter((option) =>
        option.name.toLowerCase().includes(searchValue)
      )
      setOptions(filtered)
    },
    handleClickOutside: () => {
      setActiveMenu(false)
      setOptions(options)
    },
    selectedItem,
    activeMenu,
    options,
    ref: useOutsideClick(close),
  }
}
