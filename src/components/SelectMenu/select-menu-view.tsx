import { SelectMenuOptionsType } from './select-menu-controller'
import arrow from '../../assets/arrow.png'
import './style.css'

type TSelectMenuView = {
  activeMenu: boolean
  selectedItem: null | string
  options: SelectMenuOptionsType
  type: string
  filteredData: any
  selectAnOption: any
  openOrCloseSelectMenu: any
}

export const SelectMenuView = ({
  activeMenu,
  selectedItem,
  options,
  type,
  filteredData,
  selectAnOption,
  openOrCloseSelectMenu,
}: TSelectMenuView) => {
  return (
    <div className={`selectMenu ${activeMenu ? 'activeMenu' : ''}`}>
      <div className="selectMenuHeader" onClick={openOrCloseSelectMenu}>
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
            {options.length <= 0 ? (
              <p className="no-option">No options</p>
            ) : (
              options.map((option, index) => (
                <li
                  className="option"
                  key={`${option.abbreviation}-${index}`}
                  onClick={() => selectAnOption({ option: option.name })}
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
