type TSelectMenuKeyDown = {
  e: any
  openOrCloseSelectMenu: () => void
  activeMenu: boolean
  closeSelectMenu: () => void
  selectAnOption: (option: string) => void
}

export const SelectMenuKeyDown = ({
  e,
  openOrCloseSelectMenu,
  activeMenu,
  closeSelectMenu,
  selectAnOption,
}: TSelectMenuKeyDown) => {
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
    selectAnOption(option)
  }
}
