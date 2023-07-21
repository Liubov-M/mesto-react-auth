export default function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ""}`}>
      <form className="popup__form" name={name} noValidate onSubmit={onSubmit}>
        <button className="popup__close-button" type="button" onClick={onClose}/>
        <h3 className="popup__heading">{title}</h3>
        {children}
        <button
          className="popup__submit-button popup__submit-button_enabled"
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </div>
  )
}