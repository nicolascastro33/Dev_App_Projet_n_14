import { PropsWithChildren, useRef, useState } from 'react'
import { useOutsideClick } from './utils/use-outside-click'
import { AutoCompleteKeyPress } from './keypress/auto-complete-keypress.controller'

type TInitialState = {
  street: string
  city: string
  state: string
  zipCode: string
}

interface Props extends PropsWithChildren<any> {
  delay?: number
  source?: (props?: any) => any
  onChange?: (location: any) => void
}

const defaultProps = {
  delay: 0,
}

export default function useAutoComplete(props: Props = defaultProps) {
  const [myTimeout, setMyTimeOut] = useState(setTimeout(() => {}, 0))
  const listRef = useRef<HTMLUListElement>()
  const [locations, setLocations] = useState<Array<any>>([])
  const [isBusy, setBusy] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [textValue, setTextValue] = useState<string>('')
  const [address, setAddress] = useState<TInitialState>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  })

  function delayInvoke(cb: () => void) {
    if (myTimeout) {
      clearTimeout(myTimeout)
    }
    setMyTimeOut(setTimeout(cb, props.delay))
  }

  function selectAddress(index: number) {
    if (index > -1) {
      setTextValue(locations[index].display_name)
      setAddress({
        street:
          locations[index].address.road ??
          locations[index].address.neighbourhood ??
          locations[index].address.county ??
          '',
        city: locations[index].address.city ?? '',
        state: locations[index].address.state ?? '',
        zipCode: locations[index].address.postcode ?? '',
      })
    }
    if (props.onChange) props.onChange(locations[index])
    clearLocations()
  }

  async function getlocations(searchTerm: string) {
    if (!(searchTerm && props.source)) {
      return
    }
    const options: any[] | undefined = await props.source(searchTerm)
    if (options) setLocations(options)
  }

  function clearLocations() {
    setLocations([])
    setSelectedIndex(-1)
  }

  function onTextChange(searchTerm: string) {
    setBusy(true)
    setTextValue(searchTerm)
    clearLocations()
    delayInvoke(() => {
      getlocations(searchTerm)
      setBusy(false)
    })
  }

  return {
    bindOption: {
      onClick: (e: any) => {
        const nodes = Array.from(listRef.current!.children)
        selectAddress(nodes.indexOf(e.target.closest('li')))
      },
    },
    bindInput: {
      value: textValue,
      ref: useOutsideClick(clearLocations),
      onChange: (e: any) => onTextChange(e.target.value),
    },
    bindOptions: {
      onKeyDown: (e: any) => {
        AutoCompleteKeyPress({
          e,
          clearLocations,
          selectAddress,
        })
      },
      ref: listRef,
    },
    bindOtherInputs: {
      onChange: (e: any) => {
        e.preventDefault()
        setAddress({ ...address, [e.target.name]: e.target.value })
      },
    },
    isBusy,
    locations,
    selectedIndex,
    address,
    getlocations,
    selectAddress,
    textValue
  }
}
