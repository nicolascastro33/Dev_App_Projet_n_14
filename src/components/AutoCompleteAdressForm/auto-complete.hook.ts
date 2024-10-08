import { PropsWithChildren, useRef, useState } from 'react'

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

  function selectOption(index: number) {
    if (index > -1 && props.onChange) {
      props.onChange(locations[index])
      setTextValue(locations[index].label)
      setAddress({
        street: locations[index].address.neighbourhood ?? '',
        city: locations[index].address.city ?? '',
        state: locations[index].address.state ?? '',
        zipCode: locations[index].address.postCode ?? '',
      })
    }
    clearLocations()
  }

  async function getlocations(searchTerm: string) {
    if (!(searchTerm && props.source)) {
      return
    }
    const options: any[] | undefined = await props.source(searchTerm)
    console.log(options)
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
        selectOption(nodes.indexOf(e.target.closest('li')))
      },
    },
    bindInput: {
      value: textValue,
      onChange: (e: any) => onTextChange(e.target.value),
    },
    bindOptions: {
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
  }
}
