import { useEffect, useRef, useState } from 'react'
import { SelectMenuView } from './select-menu-view'

type TSelectMenu = {
  optionsProps: SelectMenuOptionsType
  type: string
  value?: string
}

export type SelectMenuOptionsType = {
  name: string
  abbreviation: string
}[]

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLElement | undefined>()
  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref])
  return ref
}

function SelectMenu({ optionsProps, type, value }: TSelectMenu) {
  const [selectedItem, setSelectedItem] = useState<null | string>(
    value && value?.length > 1 ? value : null
  )
  const [activeMenu, setActiveMenu] = useState<boolean>(false)
  const [options, setOptions] = useState<SelectMenuOptionsType>(optionsProps)

  const handleClickOutside = () => {
    setActiveMenu(false)
    setOptions(options)
  }

  useEffect(() => {
    if (value) setSelectedItem(value)
  }, [value])

  const filteredData = (e: any) => {
    const searchValue = e.target.value.trim().toLowerCase()
    if (!searchValue) {
      setOptions(optionsProps)
      return
    }
    const filtered = options.filter((option) =>
      option.name.toLowerCase().includes(searchValue)
    )
    setOptions(filtered)
  }

  const selectAnOption = ({ option }: { option: string }) => {
    setSelectedItem(option)
    closeSelectMenu()
  }

  const openOrCloseSelectMenu = () => {
    if (activeMenu) {
      closeSelectMenu()
    } else {
      setActiveMenu(true)
    }
  }

  const closeSelectMenu = () => {
    setActiveMenu(false)
    setOptions(options)
  }

  const keyDownBehavior = (e: any) => {
    if (
      e.target.type === 'search' &&
      e.key !== 'Tab' &&
      e.key !== 'ArrowUp' &&
      e.key !== 'ArrowDown' &&
      e.key !== 'Enter'
    )
      return
    e.preventDefault()
    const focusable = [
      ...document.querySelectorAll(
        '[tabindex], input:not(.hidden-input), button:not(:disabled)'
      ),
    ] as HTMLElement[]
    const index = focusable.indexOf(e.target)

    if (e.target.className === 'selectMenuHeader' && e.key === 'Enter') {
      openOrCloseSelectMenu()
      return
    }

    if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
      const prevElement = focusable[index - 1]
      if (!prevElement.closest('.selectMenu') && activeMenu) {
        closeSelectMenu()
      }
      prevElement?.focus()
      return
    }

    if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
      const nextElement = focusable[index + 1]
      if (!nextElement.closest('.selectMenu') && activeMenu) {
        closeSelectMenu()
      }
      nextElement?.focus()
      return
    }

    if (e.key === 'Enter' && e.target.className === 'option') {
      const option = e.target.getAttribute('data-option')
      selectAnOption({ option })
    }
  }

  return (
    <SelectMenuView
      activeMenu={activeMenu}
      selectedItem={selectedItem}
      options={options}
      type={type}
      filteredData={filteredData}
      selectAnOption={selectAnOption}
      openOrCloseSelectMenu={openOrCloseSelectMenu}
      keyDownBehavior={keyDownBehavior}
      handleClickOutside={handleClickOutside}
    />
  )
}

export default SelectMenu
