import { useEffect, useState } from 'react'
import { SelectMenuView } from './select-menu-view'
import { SelectMenuKeyDown } from './select-menu.keydown'

type TSelectMenu = {
  optionsProps: SelectMenuOptionsType
  type: string
  value?: string
}

export type SelectMenuOptionsType = {
  name: string
  abbreviation: string
}[]

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

  const selectAnOption = (option: string) => {
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

  return (
    <SelectMenuView
      activeMenu={activeMenu}
      selectedItem={selectedItem}
      options={options}
      type={type}
      filteredData={filteredData}
      selectAnOption={selectAnOption}
      openOrCloseSelectMenu={openOrCloseSelectMenu}
      keyDownBehavior={(e) => {
        SelectMenuKeyDown({
          e,
          selectAnOption,
          openOrCloseSelectMenu,
          activeMenu,
          closeSelectMenu,
        })
      }}
      handleClickOutside={handleClickOutside}
    />
  )
}

export default SelectMenu
