import { useState } from 'react'
import arrow from '../assets/arrow.png'

type TSelectMenu = {
  name: string
  abbreviation: string
}[]

function SelectMenu({ options, type }: { options: TSelectMenu; type: string }) {
  const [selectedItem, setSelectedItem] = useState<null | string>(null)
  const [activeMenu, setActiveMenu] = useState<boolean>(false)
  const [value, setValue] = useState<TSelectMenu>(options)

  const filteredData = (e: any) => {
    const searchValue = e.target.value.trim().toLowerCase()
    if (!searchValue) {
      setValue(options)
      return
    }
    const filtered = options.filter((option) =>
      option.name.toLowerCase().includes(searchValue)
    )
    setValue(filtered)
  }

  return (
    <div className={`selectMenu ${activeMenu ? 'activeMenu' : ''}`}>
      <div
        className="selectMenuHeader"
        onClick={() => {
          setActiveMenu(!activeMenu)
          setValue(options)
        }}
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
          value={selectedItem ? selectedItem : ''}
        />

        <img
          src={arrow}
          alt="arrowToActiveMenu"
          className={`menuArrow ${
            activeMenu ? 'activeMenuArrow' : 'notActiveMenuArrow'
          }`}
        />
      </div>

      {activeMenu && (
        <div className={`${activeMenu ? 'activeMenuOptions' : ''}`}>
          <div className="searchSelectMenu">
            <p>Search :</p>
            <input type="search" onInput={filteredData} />
          </div>
          <div className="allOptions">
            {value.length <= 0 ? (
              <p className="no-option">No options</p>
            ) : (
              value.map((option, index) => (
                <li
                  className="option"
                  key={`${option.abbreviation}-${index}`}
                  onClick={() => {
                    setSelectedItem(option.name)
                    setActiveMenu(false)
                    setValue(options)
                  }}
                >
                  {option.name}
                </li>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectMenu
