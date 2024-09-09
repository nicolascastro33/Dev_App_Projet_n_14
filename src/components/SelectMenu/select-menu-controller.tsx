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
    setActiveMenu(false)
    setOptions(options)
  }

  const openOrCloseSelectMenu = () => {
    setActiveMenu(!activeMenu)
    setOptions(options)
  }

  const keyDownBehavior = (e: any) => {
    e.preventDefault()

    if (e.target.className === 'selectMenuHeader') {
      if (e.key === 'Enter') {
        openOrCloseSelectMenu()
        return
      }
      if (e.key === 'Tab') {
        const allFocusableElements = document.querySelectorAll(
          '[tabindex], input:not(.hidden-input), button:not(:disabled)'
        )
        const allFocusable = [...allFocusableElements] as HTMLElement[]
        const indexAllFocusable = allFocusable.indexOf(e.target)
        if (e.shiftKey) {
          allFocusable[indexAllFocusable - 1].focus()
        } else {
          allFocusable[indexAllFocusable + 1].focus()
        }
        if (activeMenu) setActiveMenu(false)

        return
      }
    }

    if (activeMenu) {
      const parentElement = e.target.closest('.selectMenu')
      const allFocusableParentElements = parentElement.querySelectorAll(
        '[tabindex], input:not(.hidden-input), button:not(:disabled)'
      )
      const focusable = [...allFocusableParentElements] as HTMLElement[]
      const index = focusable.indexOf(e.target)
      if (e.key === 'ArrowDown') {
        if (index === focusable.length - 1) {
          const allFocusableElements = document.querySelectorAll(
            '[tabindex], input:not(.hidden-input), button:not(:disabled)'
          )
          const allFocusable = [...allFocusableElements] as HTMLElement[]
          const indexAllFocusable = allFocusable.indexOf(e.target)
          allFocusable[indexAllFocusable + 1].focus()
          setActiveMenu(false)
        } else {
          focusable[index + 1]?.focus()
        }
        return
      }
      if (e.key === 'ArrowUp') {
        if (index === 1) {
          focusable[index - 1].focus()
          setActiveMenu(false)
          return
        }
        focusable[index - 1]?.focus()
        return
      }
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
