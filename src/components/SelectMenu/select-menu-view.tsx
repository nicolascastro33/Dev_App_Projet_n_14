import { SelectMenuOptionsType } from './select-menu-controller'
import arrow from '../../assets/arrow.png'
import './style.css'
import { LegacyRef } from 'react'
import { useOutsideClick } from './utils/use-outside-click'

type TSelectMenuView = {
  activeMenu: boolean
  selectedItem: null | string
  options: SelectMenuOptionsType
  type: string
  filteredData: (e: any) => void
  selectAnOption: ({ option }: { option: string }) => void
  openOrCloseSelectMenu: () => void
  keyDownBehavior: (e: any) => void
  handleClickOutside: () => void
}

export const SelectMenuView = ({
  activeMenu,
  selectedItem,
  options,
  type,
  filteredData,
  selectAnOption,
  openOrCloseSelectMenu,
  keyDownBehavior,
  handleClickOutside,
}: TSelectMenuView) => {
  const ref = useOutsideClick(handleClickOutside)
  return (
    <div
      className={`selectMenu ${activeMenu ? 'activeMenu' : ''}`}
      ref={ref as LegacyRef<HTMLDivElement> | undefined}
      onKeyDown={keyDownBehavior}
    >
      <div
        className="selectMenuHeader"
        onClick={openOrCloseSelectMenu}
        tabIndex={0}
        aria-label={`Click for ${
          activeMenu ? 'closing' : 'opening'
        }the ${type} pop up menu`}
        aria-haspopup={!activeMenu}
        aria-expanded={activeMenu}
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
          className={`hidden-input ${type}`}
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
            <input
              type="search"
              onInput={filteredData}
              aria-label={`Search input of the differents ${type} options`}
            />
          </div>
          <div className="allOptions">
            {options.length <= 0 ? (
              <p className="no-option">No options</p>
            ) : (
              options.map((option, index) => (
                <li
                  className="option"
                  key={`${option.abbreviation}-${index}`}
                  data-option={option.name}
                  onClick={() => selectAnOption({ option: option.name })}
                  tabIndex={0}
                  aria-label={option.name}
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
