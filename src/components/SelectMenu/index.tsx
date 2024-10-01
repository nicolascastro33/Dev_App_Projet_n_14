import { LegacyRef } from 'react'
import { SelectMenuKeyPress } from './keypress/select-menu-keypress.controller'
import arrow from '../../assets/arrow.png'
import './style.css'
import { useSelectMenu } from './select-menu.hook'

export type TSelectMenu = {
  optionsProps: SelectMenuOptionsType
  type: string
  value?: string
}

export type SelectMenuOptionsType = {
  name: string
  abbreviation: string
}[]

function SelectMenu({ optionsProps, type, value }: TSelectMenu) {
  const {
    activeMenu,
    ref,
    selectOption,
    toggle,
    close,
    selectedItem,
    filteredData,
    options,
  } = useSelectMenu({
    optionsProps,
    value,
  })

  return (
    <div
      className={`selectMenu ${activeMenu ? 'activeMenu' : ''}`}
      ref={ref as LegacyRef<HTMLDivElement> | undefined}
      onKeyDown={(e) =>
        SelectMenuKeyPress({
          e,
          selectOption,
          openOrCloseSelectMenu: toggle,
          activeMenu,
          closeSelectMenu: close,
        })
      }
    >
      <div
        className="selectMenuHeader"
        onClick={toggle}
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
                  onClick={() => selectOption(option.name)}
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

export default SelectMenu
