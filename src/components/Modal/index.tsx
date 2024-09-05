import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import './style.css'

function Modal({
  setIsModalOpened,
  message,
}: {
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  message: string
}) {
  document.body.style.overflow = 'hidden'

  const closeModal = (e: any) => {
    e.preventDefault()
    document.body.style.overflow = 'unset'
    setIsModalOpened(false)
  }
  return (
    <div className="modalContainer" id="confirmation">
      <div className="overlayModal" />
      <div className="modal">
        <h2>{message}</h2>
        <FontAwesomeIcon
          onClick={closeModal}
          icon={faCircleXmark}
          className="modalCloseButton"
        />
      </div>
    </div>
  )
}

export default Modal
