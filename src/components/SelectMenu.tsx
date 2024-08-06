import { useState } from 'react'
import arrow from '../assets/arrow.png'

type TSelectMenu = {
  name: string
  abbreviation: string
}[]

function SelectMenu({ options, type }: { options: TSelectMenu; type: string }) {
  const [selectedItem, setSelectedItem] = useState<null | string>(null)
  const [activeMenu, setActiveMenu] = useState<boolean>(false)

  return (
    <div
      className={`selectMenu ${activeMenu ? 'activeMenu' : 'notActiveMenu'}`}
    >
      <div
        className="selectMenuHeader"
        onClick={() => setActiveMenu(!activeMenu)}
      >
        {selectedItem !== null ? (
          <p className="selectedItem" id={type}>
            {selectedItem}
          </p>
        ) : (
          <p className="notSelectedItem">Select</p>
        )}
        <input
          type="hidden"
          id={type}
          className={type}
          name={type}
          value={selectedItem ? selectedItem : ""}
        />

        <img
          src={arrow}
          alt='arrowToActiveMenu'
          className={`menuArrow ${
            activeMenu ? 'activeMenuArrow' : 'notActiveMenuArrow'
          }`}
        />
      </div>

      {activeMenu && (
        <div
          className={`${
            activeMenu ? 'activeMenuOptions' : 'notActiveMenuOptions'
          }`}
        >
          {options.map((option, index) => (
            <li
              className="option"
              key={`${option.abbreviation}-${index}`}
              onClick={() => {
                setSelectedItem(option.name)
                setActiveMenu(false)
              }}
            >
              {option.name}
            </li>
          ))}
        </div>
      )}
    </div>
  )
}

export default SelectMenu
