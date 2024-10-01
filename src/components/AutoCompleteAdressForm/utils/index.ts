export const isNewElementInParentElement = ({
    newElement,
    parentElementClassName,
  }: {
    newElement: HTMLElement | undefined
    parentElementClassName: string
  }) => {
    if (!newElement) return false
    return newElement.closest(`.${parentElementClassName}`) ? true : false
  }
  