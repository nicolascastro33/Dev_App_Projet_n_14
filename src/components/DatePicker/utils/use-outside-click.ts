import { useRef, useEffect } from 'react'

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLElement | undefined>()
  useEffect(() => {
    const handleClick = (event: any) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.closest('.select-month-wrapper')
      ) {
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
