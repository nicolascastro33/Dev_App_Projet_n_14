import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

function Modal({ closeModalButton }: { closeModalButton: any }) {
  document.body.style.overflow = 'hidden'
  return (
    <div className="modalContainer" id="confirmation">
      <div className="overlayModal" />
      <div className="modal">
        <h2>Employee Created!</h2>
        <FontAwesomeIcon
          onClick={closeModalButton}
          icon={faCircleXmark}
          className="modalCloseButton"
        />
      </div>
    </div>
  )
}

export default Modal
